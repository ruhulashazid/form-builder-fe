import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useAxios, { apiClient } from "utils/axios";
import { PROFILE_ACTION_MENUS, SESSION_STORAGE_KEYS } from "utils/constants";
import { useAuth } from "./contexts/auth-context";

function ManageUsers() {
  const { HttpRequestController } = useAxios();
  const { handleLogout, user } = useAuth();

  const [users, setUsers] = React.useState<Array<any>>([]);

  const getUserList = React.useCallback(() => {
    apiClient
      .get<{ users: Array<any> }>("/users", {
        headers: {
          Authorization: localStorage.getItem(SESSION_STORAGE_KEYS.TOKEN),
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  }, []);

  React.useEffect(() => {
    getUserList();
  }, [getUserList]);

  const handleDeleteUser = async (userId: string) => {
    const response = await apiClient.delete<{ message: string; user: any }>(
      `/profile/${userId}`,
      {
        headers: {
          Authorization: localStorage.getItem(SESSION_STORAGE_KEYS.TOKEN),
        },
      }
    );

    alert(response.data.message);

    getUserList();
  };

  if (user.role !== "admin") {
    return <div>You do not have access.</div>;
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item lg={8}>
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item lg={4}>
              <Card key={u._id} elevation={2}>
                <CardContent>
                  <img height={60} width={50} style={{borderRadius:9999}} src={u.image}/>
                  <Typography>Name: {u.username}</Typography>
                  <Typography>email: {u.email}</Typography>
                  <Typography>phone: {u.phone}</Typography>
                  <Typography>Role: {u.role ? u.role : "user"}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color={"error"}
                    onClick={handleDeleteUser.bind(null, u._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ManageUsers;

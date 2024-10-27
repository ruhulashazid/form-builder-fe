import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useAxios, { apiClient } from "utils/axios";
import { PROFILE_ACTION_MENUS, SESSION_STORAGE_KEYS } from "utils/constants";
import { useAuth } from "./contexts/auth-context";

function EditProfile() {
  const { HttpRequestController } = useAxios();
  const { handleLogout, user } = useAuth();
  const logout = () => {
    localStorage.clear();
    handleLogout(true);
  };

  const usernameRef = React.useRef<HTMLInputElement>(null!);
  const emailRef = React.useRef<HTMLInputElement>(null!);
  const phoneRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    const userId = localStorage.getItem(SESSION_STORAGE_KEYS.USER_ID);

    (async () => {
      const resposne = await HttpRequestController(`/${userId}`);

      usernameRef.current.value = resposne.username;
      emailRef.current.value = resposne.email;
      phoneRef.current.value = resposne.phone;
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;

    const formData = new FormData(formEl);

    const response = await apiClient.putForm<{ message: string; user: any }>(
      "/profile",
      formData,
      {
        headers: {
          Authorization: localStorage.getItem(SESSION_STORAGE_KEYS.TOKEN),
        },
      }
    );

    const updatedUser = response.data.user;

    localStorage.setItem(SESSION_STORAGE_KEYS.EMAIL, updatedUser.email);
    localStorage.setItem(SESSION_STORAGE_KEYS.USERNAME, updatedUser.username);
    localStorage.setItem(SESSION_STORAGE_KEYS.PHONE, updatedUser.phone ?? "");
    localStorage.setItem(SESSION_STORAGE_KEYS.IMAGE, updatedUser.image ?? "");

    window.location.reload();
  };

  const handleDeleteProfile = async () => {
    await apiClient.delete<{ message: string; user: any }>(
      `/profile/${user.userId}`,
      {
        headers: {
          Authorization: localStorage.getItem(SESSION_STORAGE_KEYS.TOKEN),
        },
      }
    );
    logout();
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item lg={6}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title={"Edit profile"} />
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  margin={"dense"}
                  name={"avatar"}
                  type="file"
                  focused
                  label={"Profile picture"}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  name={"username"}
                  margin={"dense"}
                  label={"Username"}
                  type="text"
                  inputRef={usernameRef}
                  focused
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  margin={"dense"}
                  name={"email"}
                  type="email"
                  label={"Email"}
                  inputRef={emailRef}
                  focused
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  margin={"dense"}
                  name={"phone"}
                  type="text"
                  label={"Phone"}
                  inputRef={phoneRef}
                  focused
                />
              </div>
            </CardContent>

            <CardActions>
              <Button type={"submit"}>Update</Button>
              <Button onClick={handleDeleteProfile}>delete</Button>
              <Button type={"button"} color={"secondary"} onClick={logout}>
                Logout
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
}

export default EditProfile;

import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React, { memo } from "react";
import formimage from "../../assets/images/forms-icon.png";
import "./Header.scss";
import TemporaryDrawer from "../Sidenav/Drawer";
import ProfileButton from "components/common/Dropdown";
import { useDocumentsName } from "components/contexts/documents-context";
import { useGuide } from "components/contexts/guide-context";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "utils/constants";

// Header displayed on home page
export const Header = memo(() => {
  const { handleInputChange } = useDocumentsName();
  const { guideTour, closeTour, homePageGuide } = useGuide();
  const navigate = useNavigate();

  const goToHomeScreen = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="header">
      <div className="header-info">
        <TemporaryDrawer />
        <img
          src={formimage}
          alt="no-image"
          className="form-image"
          onClick={goToHomeScreen}
        />
        <div className="info">Forms</div>
      </div>
      <div className="header-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      <div className="row">
        <IconButton style={{ margin: "0px" }}>
          <AppsIcon style={{ fontSize: "22px" }} />
        </IconButton>
        <ProfileButton />
      </div>
    </div>
  );
});

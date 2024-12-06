import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import cook from "../images/cook.png";

function Header() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { label: "HOME", value: "home", link: "/home" },
    { label: "FAVOURITE", value: "favourite", link: "/favourite" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        paddingInline: "30px",
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={cook}
            alt="Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.value}
              to={tab.link}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#ff6f61" : "#000",
                textDecoration: "none",
                fontSize: "16px",
              })}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </NavLink>
          ))}
        </Box>

        <IconButton sx={{ color: "#000" }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

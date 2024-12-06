import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import cook from "../images/cook.png";

function Login() {

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "#dddd",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#fff",
          padding: { xs: 2, sm: 4 },
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img src={cook} style={{ width: "50%", height: "auto" }} alt="cook"/>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "300",
            color: "#333",
            justifySelf: "left",
          }}
        >
          Login
        </Typography>

        <TextField
          label="Email address"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          error
          helperText="Please enter a password"
          sx={{ marginBottom: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff6f61",
            "&:hover": { backgroundColor: "#e45d51" },
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Sign In
        </Button>

        <Typography variant="body2">
          Don’t have an account?{" "}
          <Link href="/signup" sx={{ color: "#ff6f61", fontWeight: "bold" }}>
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;

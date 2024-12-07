import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import cook from "../images/cook.png";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../Action/authAction";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

function LoginUser() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Checking...", { id: "checking" });
    } else if (loading === false) {
      toast.dismiss("checking");
    }
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!email) {
      toast.error("Email required..!", { id: "email" });
    } else if (!password) {
      toast.error("Password required..!", { id: "pwd" });
    } else {
      const form = { email, password };
      dispatch(Login(form));
      setEmail("");
      setPassword("");
    }
  };

  if (authenticated) {
    return <Navigate to="/home" />;
  }

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
        <img src={cook} style={{ width: "50%", height: "auto" }} alt="cook" />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "300",
            color: "#333",
            mb: "5px",
            justifySelf: "left",
          }}
        >
          Login
        </Typography>

        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin} 
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

export default LoginUser;

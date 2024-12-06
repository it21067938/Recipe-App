import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import cook from "../images/cook.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Register } from "../Action/authAction";

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [getpassword, setpassword] = useState("");
  const [getrepassword, setrepassword] = useState("");

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", { id: "checking" });
    } else if (loading === false) {
      toast.dismiss("checking");
    }
  }, [loading]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required..!", { id: "email" });
    } else if (!phone) {
      toast.error("Phone Number required..!", { id: "pwd" });
    } else if (!firstName) {
      toast.error("First Name required..!", { id: "pwd" });
    } else if (!lastname) {
      toast.error("Last Name required..!", { id: "pwd" });
    } else if (!getpassword) {
      toast.error("Password required..!", { id: "pwd" });
    } else if (getpassword != getrepassword) {
      toast.error("Password not match..!", { id: "pwd" });
    } else if (
      email != "" &&
      phone != "" &&
      lastname != "" &&
      firstName != "" &&
      getpassword != "" &&
      getrepassword != "" &&
      getpassword === getrepassword
    ) {
      const regdata = {
        firstName,
        lastname,
        email,
        phone,
        password: getrepassword,
      };
      dispatch(Register(regdata));
      setEmail("");
      setpassword("");
      setFirstName("");
      setrepassword("");
      setLastname("");
      setPhone("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: { xs: "90%", sm: 300, md: 500 },
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img src={cook} style={{ width: "120px", height: "auto" }} alt="cook" />

        {/* Heading */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "300",
            color: "#333",
          }}
        >
          Register
        </Typography>

        {/* Input Fields */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          <TextField
            label="First name"
            variant="outlined"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={getpassword}
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={getrepassword}
            onChange={(e) => setrepassword(e.target.value)}
            
          />
        </Box>

        {/* Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#ff6f61",
            "&:hover": { backgroundColor: "#e45d51" },
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            height: "50px",
          }}
        >
          Create Account
        </Button>

        {/* Footer Links */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link href="/" sx={{ color: "#ff6f61", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;

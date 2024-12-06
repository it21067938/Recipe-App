import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import cook from "../images/cook.png";

function Signup() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#dddd",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 300, md: 500 },
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
       <img src={cook}   style={{ width: "120px", height: "auto" }} alt="cook" />

        {/* Heading */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "300",
            color: "#333",
            justifySelf: "left",
          }}
        >
          Register
        </Typography>

        {/* Input Fields */}
        <Box
          component="form"
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
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth
            required
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            required
            sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            error
            helperText="The password does not match"
            sx={{ gridColumn: "span 1" }}
          />
        </Box>

        {/* Button */}
        <Button
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

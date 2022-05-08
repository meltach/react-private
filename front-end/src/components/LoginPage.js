import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, CardContent, Stack, Card, Typography } from "@mui/material";

import { useToken } from "../auth/useToken";
import axios from "axios";

const LoginPage = () => {
  const [token, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = async () => {
    const response = await axios.post("/api/login", {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    navigate("/");
  };
  return (
    <Card sx={{ width: 300, marginTop: "2rem" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, marginBottom: "1rem" }}
          color="text.primary"
          gutterBottom
        >
          Login to your todo's
        </Typography>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            id="outlined-email"
            label="Email"
            autoComplete="username"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <TextField
            autoComplete="current-password"
            id="outlined-password"
            label="Password"
            type={"password"}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Button
            disabled={!passwordValue || !emailValue}
            onClick={onLoginClicked}
          >
            Sign In
          </Button>
          <Button size="small" onClick={() => navigate("/forgot-password")}>
            Forgot password
          </Button>
          <Button size="small" onClick={() => navigate("/signup")}>
            Don't have an account? Sign Up
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, CardContent, Stack, Card, Typography } from "@mui/material";

import { useToken } from "../auth/useToken";
import axios from "axios";

const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signup", {
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
            autoComplete="username"
            id="outlined-email"
            label="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <TextField
            id="outlined-password"
            label="Password"
            autoComplete="new-password"
            value={passwordValue}
            type={"password"}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <TextField
            id="outlined-repeat-password"
            label="Repeat Password"
            type={"password"}
            autoComplete="new-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button
            disabled={!passwordValue || passwordValue !== repeatPassword}
            onClick={onSignUpClicked}
          >
            Sign Up
          </Button>
          <Button size="small">Forgot password</Button>
          <Button size="small" onClick={() => navigate("/login")}>
            Have an account? Sign In
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;

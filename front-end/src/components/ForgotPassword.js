import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  CardContent,
  Stack,
  Card,
  Typography,
  TextField,
} from "@mui/material";

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();
  const onSubmitClicked = () => {};
  return (
    <Card sx={{ width: 300, marginTop: "2rem" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, marginBottom: "1rem" }}
          color="text.primary"
          gutterBottom
        >
          Enter your email, we will send you a reset link
        </Typography>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            id="outlined-email"
            label="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Button disabled={!emailValue} onClick={onSubmitClicked}>
            Submit
          </Button>
          <Button size="small" onClick={() => navigate("/login")}>
            You remember it? Login In
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;

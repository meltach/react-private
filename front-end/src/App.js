import React from "react";
import PersonalTodo from "./components/PersonalTodo";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<PersonalTodo />} />
            </Route>

            <Route path="todos" element={<PersonalTodo />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;

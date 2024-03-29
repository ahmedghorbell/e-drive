import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../js/actions/AuthActions";
import { toast } from "react-toastify";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setIsFormSubmitted(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUser = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    dispatch(login(user));
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (isAuth) {
        toast("Logged in successfully");
        navigate("/");
      } else {
        toast("Login failed. Please try again.");
      }
    }
  }, [isAuth, isFormSubmitted, navigate ]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="email"
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "15px" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
          
              onClick={handleUser}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid item>
              <Link variant="body2" to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
              <br />
              <Link variant="body2" to="/">
                {"Forgot password ?"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ParticalsJs from "../components/ParticalsJs";
import { Image } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://sparkradius.in/">
        SPARK RADIUS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogginScreen() {
  const [isVisible, setVisiblity] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    await localStorage.setItem("user", data.get("email"));
    navigate("/dashboard");
    navigate(0);
  };

  if (localStorage.getItem("user") !== null) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ display: "flex" }}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 990,
          }}
        >
          <ParticalsJs />
          <CssBaseline />
          <Box
            sx={{
              bgcolor: "#ffffff",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              borderRadius: "8px",
              zIndex: 10,
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
           
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography variant="h4" sx={{ fontWeight: "900" }}>
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Username Or Email"
                // label="Email "
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <div
                        onClick={() => setVisiblity(!isVisible)}
                        style={{ cursor: "pointer" }}
                      >
                        {isVisible ? (
                          <RemoveRedEyeIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </div>
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, zIndex: 10 }} />
        </Container>
        <div className="university-banner-intro" style={{ zIndex: 1000 }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={require("../assets/images/abc-university.png")}
              width={"250px"}
              style={{ marginBottom: "15px" }}
            />

            {/* <Typography variant="h5" sx={{ fontWeight: "900" }}>
              University of VBC
            </Typography>
            <p style={{ fontSize: "12px", color: "#F4B119" }}>
              ACCREDITED BY NAAC WITH "A+" GRADE
            </p> */}
          </Container>
          <div className="intro-card">
            <h1>GITAM University Internet Log Solution</h1>
            <p style={{ maxWidth: "45vw" }}>
              Welcome to the network service log application for the
              administrative users of GITAM University. This tool provides
              detailed logs of internet activity based on date and time
              constraints, ensuring efficient monitoring and management of
              network usage.
              {/* users now can
              manage their credentials and control their network activity */}
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

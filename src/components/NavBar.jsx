import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { appTheme } from "../constants/colors";
import { Image, Widgets } from "@mui/icons-material";
import { Icon, InputAdornment, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../App.css";

const pages = ["dashboard", "logs"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="full-width"
      position="sticky"
      style={{
        // maxWidth: "100vw",
        // width: `${window.innerWidth}px`,
        // margin: "20px",
        borderRadius: "10px",
        backgroundColor: appTheme,
        overflowX: "hidden",
      }}
    >
      <Container style={{ maxWidth: "100vw" }}>
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              component={"img"}
              width={"120px"}
              // style={{ padding: "0.5rem" }}
              src={require("../assets/images/abc-university.png")}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "900" }}>
                University of ABC
              </Typography>
              <p style={{ fontSize: "12px", color: "#F4B119" }}>
                ACCREDITED BY NAAC WITH "A+" GRADE
              </p>
            </div>
          </div>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              component={"img"}
              width={"80px"}
              style={{ padding: "1rem" }}
              src={require("../assets/images/abc-university.png")}
            />
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      width: "fit-content",
                    }}
                  >
                    <Link
                      to={`/${page}`}
                      style={{
                        textDecoration: "none",
                        color:
                          location.pathname === `/${page}`
                            ? "white"
                            : "whitesmoke",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          mr: 2,
                          display: { xs: "none", md: "flex" },
                          flexDirection: { xs: "none", md: "column" },
                          justifyContent: { xs: "none", md: "center" },
                          alignItems: { xs: "none", md: "center" },
                          fontSize: "20px",

                          flexGrow: 1,
                          // fontFamily: "monospace",
                          fontWeight:
                            location.pathname === `/${page}` ? "900" : "600",
                          // letterSpacing: ".3rem",
                          // lineHeight: "1rem",
                          // textDecoration:
                          //   location.pathname === `/${page}`
                          //     ? "underline"
                          //     : "none",
                        }}
                      >
                        <p style={{ margin: "0", padding: "0" }}>{page}</p>

                        {location.pathname === `/${page}` && (
                          <div
                            style={{
                              width: "40px",
                              height: "4px",
                              backgroundColor: "white",
                            }}
                          ></div>
                        )}
                      </Typography>
                    </Link>
                  </Button>
                ))}
              </Box>

              <TextField
                sx={{
                  mr: 2,
                  backgroundColor: "white",
                  "& fieldset": { border: "none" },
                  borderRadius: "8px",
                }}
                placeholder="Search by username or ID"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
              <p>|</p>
              <IconButton onClick={() => {}} sx={{ p: 0, pr: 2, pl: 2 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleIcon
                  sx={{ fontSize: "45px", color: "whitesmoke" }}
                />
              </IconButton>
              <p>ADMIN</p>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <KeyboardArrowDownIcon color="light" htmlColor="#d4d4d4" />
                </IconButton>
              </Tooltip>
            </div>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      localStorage.clear("user");
                      navigate("/login");
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

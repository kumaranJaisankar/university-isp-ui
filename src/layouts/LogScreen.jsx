import React from "react";
import NavBar from "../components/NavBar";
import {
  Button,
  Card,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import { appTheme } from "../constants/colors";
export default function LogScreen() {
  return (
    <div
      style={{
        margin: "15px",
        overflowX: "hidden",
        // backgroundColor: "red",
        minHeight: "100vh",
        // margin: "20px",
      }}
    >
      <NavBar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: "35vw",
            padding: "20px",
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{
              my: 1,
              backgroundColor: "white",
              // "& fieldset": { border: "none" },
              borderRadius: "8px",
            }}
            label="Username"
            placeholder="Username or ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ my: 1 }}>
              <DatePicker label="Start date" />
              <DatePicker label="End date" />
            </DemoContainer>
            <DemoContainer components={["TimePicker"]} sx={{ my: 1 }}>
              <TimePicker ampm={false} format="HH:mm:ss" label="Start Time" />
              <TimePicker ampm={false} format="HH:mm:ss" label="End Time" />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            sx={{
              my: 1,
              backgroundColor: "white",
              // "& fieldset": { border: "none" },
              borderRadius: "8px",
            }}
            label="Log name"
            placeholder="log file name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFileRenameOutlineIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <Button
            sx={{
              my: 2,
              alignSelf: "center",
              width: "150px",
              backgroundColor: appTheme,
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Card>
      </Container>
      {/* <DashboardBanner /> */}
    </div>
  );
}

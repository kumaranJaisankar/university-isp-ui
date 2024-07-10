import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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
import dayjs from "dayjs";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { renderTimeViewClock } from "@mui/x-date-pickers";

export default function SentRequestTab() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [logFileName, setLogFileName] = useState("");
  const [userType, setUserType] = useState("ipAddress");

  const [startDate, setSelectedDate] = useState(
    dateFormat(dayjs(new Date()).subtract(1, "day"))
  );
  const [endDate, setSelectedEndate] = useState(
    dateFormat(dayjs(new Date()).subtract(1, "day"))
  );

  const [startTime, setSelectStartTime] = useState(
    handelTimeFormat(dayjs().hour(0).minute(0).second(0))
  );
  const [startHour, setselectedStartHour] = useState(0);
  const [endTime, setSelectEndTime] = useState(
    handelTimeFormat(dayjs().hour(23).minute(59).second(0))
  );

  function dateFormat(data) {
    const date = new Date(data.$d);
    const followingDay = new Date(date.getTime());
    const formattedDate = followingDay.toISOString().split("T")[0];
    return formattedDate;
  }

  const handleDateChange = (data) => {
    // Get the YYYY-MM-DD part

    setSelectedDate(dateFormat(data));
    console.log(dateFormat(data));
  };

  const handleEndDateChange = (data) => {
    setSelectedEndate(dateFormat(data));
    console.log(dateFormat(data));
  };

  function handelTimeFormat(data) {
    const date = new Date(data.$d);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  const handleStartTime = (data) => {
    const date = new Date(data.$d);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    setselectedStartHour(date.getHours());
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    console.log(formattedTime);
    setSelectStartTime(formattedTime);
  };

  const handleEndTime = (data) => {
    console.log(handelTimeFormat(data));
    setSelectEndTime(handelTimeFormat(data));
  };

  const onSubmitForm = () => {
    toast.loading("Please wait...");
    const data = {
      user_id: userName,
      start_date: startDate,
      end_date: endDate,
      output_file_name: `${userName}_${startDate}_${endDate}_${startTime}_${endTime}`,
      start_time: startTime,
      end_time: endTime,
      user_type: userType,
    };
    console.log(`${userName}_${startDate}_${endDate}_${startTime}_${endTime}`);
    // const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
    // delay(3000).then(
    //   () => {}
    //   // toast.update(id, {
    //   //   render: "All is good",
    //   //   type: "success",
    //   //   isLoading: false,
    //   // })
    // );

    fetch(`${process.env.REACT_APP_API_URL_ADMIN}/logs/trigger-script/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.dismiss();
        // delay(5000).then(() => navigate("/dashboard"));
        toast.success("Successflly submited", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        console.log("Data:", data); // Check the data structure
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error(error === "" ? error : "Something wrong", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // console.error("Error fetching data:", error);
      });
  };

  const formControl = (e) => {};
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />{" "}
      <>
        {/* {isLoading && <CircularProgress />} */}
        <h3 style={{ color: "grey" }}>New Request :</h3>
        <form
          onSubmit={(v) => {
            v.preventDefault();
            onSubmitForm();
          }}
        >
          <Card
            sx={{
              width: "100vw",
              maxWidth: "100%",
              padding: "0px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              p: 1,
            }}
          >
            {" "}
            <FormControl>
              <div>
                <InputLabel id="demo-simple-select-standard-label">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={userType}
                  size="small"
                  name="usertype"
                  autoWidth
                  fullWidth
                  label="type"
                  onChange={(e) => setUserType(e.target.value)}
                  // sx={{ width: "250px" }}
                >
                  <MenuItem value="ipAddress">Ip address</MenuItem>
                  <MenuItem value="userId">User ID</MenuItem>
                </Select>
              </div>
              <br />
              <TextField
                size="small"
                required={true}
                sx={{
                  my: 1,
                  backgroundColor: "white",
                  // "& fieldset": { border: "none" },
                  borderRadius: "8px",
                }}
                onChange={(e) => setUserName(e.target.value)}
                label={userType === "ipAddress" ? "Ip address" : "User Id"}
                placeholder={
                  userType === "ipAddress"
                    ? "Enter Ip address"
                    : "Enter User Id"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  my: 1,
                }}
              >
                <DatePicker
                  sx={{
                    ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "grey",
                    },
                  }}
                  defaultValue={dayjs(new Date(startDate))}
                  slotProps={{
                    textField: {
                      required: true,
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                  format="DD/MM/YYYY"
                  label="Start date"
                  maxDate={dayjs(new Date())}
                  onChange={handleDateChange}
                />
                <DatePicker
                  sx={{
                    ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "grey",
                    },
                  }}
                  defaultValue={dayjs(new Date(endDate))}
                  slotProps={{
                    textField: {
                      required: true,
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                  format="DD/MM/YYYY"
                  label="End date"
                  minDate={dayjs(startDate)}
                  maxDate={dayjs(new Date())}
                  onChange={handleEndDateChange}
                />
              </DemoContainer>
              <DemoContainer components={["TimePicker"]} sx={{ my: 1 }}>
                <TimePicker
                  sx={{
                    ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "grey",
                    },
                  }}
                  defaultValue={dayjs().hour(0).minute(0).second(0)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={handleStartTime}
                  ampm={false}
                  format="HH:mm:ss"
                  label="Start Time"
                />
                <TimePicker
                  sx={{
                    ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input": {
                      color: "grey",
                    },
                  }}
                  defaultValue={dayjs().hour(23).minute(59).second(0)}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={handleEndTime}
                  minTime={dayjs().set("hour", startHour)}
                  ampm={false}
                  format="HH:mm:ss"
                  label="End Time"
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* <TextField
              onChange={(e) => setLogFileName(e.target.value)}
              required={true}
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
            /> */}
            <Button
              type="submit"
              sx={{
                my: 2,
                alignSelf: "center",
                width: "150px",
                backgroundColor: appTheme,
              }}
              variant="contained"
              // onClick={onSubmit}
            >
              SUBMIT
            </Button>
          </Card>
        </form>
      </>
      {/* <DashboardBanner /> */}
    </div>
  );
}

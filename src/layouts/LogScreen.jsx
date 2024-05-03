import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
  Button,
  Card,
  CircularProgress,
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
import dayjs from "dayjs";
import {  Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






export default function LogScreen() {
  const [isLoading,setLoading]= useState(false)
  const [userName,setUserName] =useState("")
  const [logFileName,setLogFileName] =useState("")

  const [startDate,setSelectedDate] = useState('')
  const [endDate,setSelectedEndate] = useState('')
  

  const [startTime,setSelectStartTime] =useState("")
  const [startHour,setselectedStartHour] =useState(0)
  const [endTime,setSelectEndTime] =useState("")

  const handleDateChange = (data) => {
    const date = new Date(data.$d);
    const followingDay = new Date(date.getTime() + 86400000);
    const formattedDate = followingDay.toISOString().split('T')[0]; // Get the YYYY-MM-DD part
    
     setSelectedDate(formattedDate)
  };

  const handleEndDateChange = (data) => {
    const date = new Date(data.$d);
    const followingDay = new Date(date.getTime() + 86400000);
    const formattedDate = followingDay.toISOString().split('T')[0];  // Get the YYYY-MM-DD part
setSelectedEndate(formattedDate)
console.log(formattedDate)
  };
  const handleStartTime =(data)=>{
    const date = new Date(data.$d);

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
setselectedStartHour(date.getHours())
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
console.log(formattedTime); 
setSelectStartTime(formattedTime)
  }

  const handleEndTime =(data)=>{
    const date = new Date(data.$d);

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
console.log(formattedTime); 
setSelectEndTime(formattedTime)
  }

  const onSubmitForm =()=>{
    const data = {
      "user_id":userName,
      "start_date":startDate,
      "end_date": endDate,
      "output_file_name": logFileName,
      "start_time":startTime===""?"00:00:00":startTime,
      "end_time":endTime===""?"23:59:59":endTime
  }
  console.log(data)
  setLoading(true)

    fetch("http://localhost:8000/logs/trigger-script/",{method:"POST", headers: {
      "Content-Type": "application/json",
    },body:JSON.stringify(data)})
    .then((response) => response.json())
    .then((data) => {
      setLoading(false);
      toast.success("User Added Successfully");

      console.log("Data:", data); // Check the data structure
    })
    .catch((error) => {
      setLoading(false);
      toast.error(error);

      console.error("Error fetching data:", error);
    });


  }

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
        {isLoading && <CircularProgress/>}
        <form onSubmit={(v)=>{v.preventDefault()
        onSubmitForm()
        }}>
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
          
          required={true}
            sx={{
              my: 1,
              backgroundColor: "white",
              // "& fieldset": { border: "none" },
              borderRadius: "8px",
            }}
            onChange={(e)=>setUserName(e.target.value)}
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
            <DemoContainer  components={["DatePicker"]} sx={{ my: 1 }}>
              <DatePicker   slotProps={{
          textField: {
            required:true,
            variant: 'outlined',
          },
        }}   format="DD/MM/YYYY" label="Start date"  onChange={handleDateChange}/>
              <DatePicker slotProps={{
          textField: {
            required:true,
            variant: 'outlined',
          },
        }}  format="DD/MM/YYYY" label="End date"  minDate={dayjs(startDate)} onChange={handleEndDateChange}/>
            </DemoContainer>
            <DemoContainer components={["TimePicker"]} sx={{ my: 1 }}>
              <TimePicker onChange={handleStartTime} ampm={false} format="HH:mm:ss" label="Start Time" />
              <TimePicker onChange={handleEndTime} minTime={dayjs().set('hour', startHour)} ampm={false} format="HH:mm:ss" label="End Time" />
            </DemoContainer>
          </LocalizationProvider>
          <TextField onChange={(e)=>setLogFileName(e.target.value)}
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
          />
          <Button type="submit"
            sx={{
              my: 2,
              alignSelf: "center",
              width: "150px",
              backgroundColor: appTheme,
            }}
            variant="contained"
            // onClick={onSubmit}
          >
            Submit
          </Button>
        </Card>
        </form>
      </Container>
      {/* <DashboardBanner /> */}
    </div>
  );
}

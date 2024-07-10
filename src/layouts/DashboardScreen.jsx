import React, { useState } from "react";
import NavBar from "../components/NavBar";
import DashboardBanner from "../components/DashboardBanner";
import "../styles/DashboardScreen.css";
import { Link, useNavigate } from "react-router-dom";
import { appTheme } from "../constants/colors";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SentRequestTab from "../components/SentRequestTab";
import OngoingFilterScreen from "./OngoingFilterScreen";
import { Box, Button, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FilteredLogScreen from "./FilteredLogScreen";
import Loader from "../components/Loader";
import FailedLogs from "./FailedLog";

export default function DashboardScreen() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refreshStatus = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL_ADMIN}/logs/update-running-logs/`, {
      headers: { Authorization: `Token ${user.token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        navigate(0);
        console.log("Data:", data); // Check the data structure
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error fetching data:", error);
      });
  };
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Loader isLoading={isLoading} />

      <SentRequestTab />
      <Box sx={{ width: "100%", typography: "body1", mt: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab
                // style={{
                //   backgroundColor: "grey",
                //   borderRadius: "10px 10px 0 0",
                //   color: "green",
                // }}
                label="Filtered Logs"
                value="1"
                TouchRippleProps={{ style: { color: "green" } }}
              />
              <Tab
                label="Ongoing Logs"
                value="2"
                TouchRippleProps={{ style: { color: "yellow" } }}
                // sx={{ backgroundColor: "yellow", borderRadius: "10px" }}
              />
              <Tab
                label="Failed Logs"
                value="3"
                TouchRippleProps={{ style: { color: "red" } }}
              />
              <Button
                variant="contained"
                sx={{ position: "absolute", right: 0, borderRadius: "30px" }}
                onClick={refreshStatus}
              >
                <AutorenewIcon style={{ color: "white" }} />
                Refresh
              </Button>
            </TabList>
          </Box>
          <TabPanel value="1">
            {" "}
            <FilteredLogScreen />
          </TabPanel>
          <TabPanel value="2">
            <OngoingFilterScreen />
          </TabPanel>
          <TabPanel value="3">
            <FailedLogs />
          </TabPanel>
        </TabContext>
      </Box>
      {/* <OngoingFilterScreen /> */}
    </div>
  );
}

{
  /* <DashboardBanner /> */
}
//  <div className="ag-format-container">
//  <div id="myBtn" onClick={refreshStatus}>
//    <AutorenewIcon style={{color:"white"}} />
// <p style={{color:"white"}}>Refresh log Status</p>
//  </div>
//    <div className="ag-courses_box">

//      <div className="ag-courses_item">
//        <Link to={"/filtered-logs"} className="ag-courses-item_link">
//          <div className="ag-courses-item_bg"></div>

//          <div className="ag-courses-item_title">
//            Filtration Completed Logs{" "}
//          </div>

//          <div className="ag-courses-item_date-box">
//            {/* Start:
//            <span className="ag-courses-item_date">04.11.2022</span> */}
//            <div className="card-icons">
//              <img
//                src={require("../assets/images/schedule.png")}
//                width={100}
//                className="icon-color"
//              />
//            </div>
//          </div>
//        </Link>
//      </div>

//      <div className="ag-courses_item">
//        <Link to={"/ongoing-logs"} className="ag-courses-item_link">
//          <div className="ag-courses-item_bg"></div>

//          <div className="ag-courses-item_title">
//            Ongoing Filtration Logs
//          </div>

//          <div className="ag-courses-item_date-box">
//            <div className="card-icons">
//              <img
//                src={require("../assets/images/calendar.png")}
//                width={100}
//                className="icon-color"
//              />
//            </div>
//          </div>
//        </Link>
//      </div>

//      <div className="ag-courses_item">
//        <Link to={"/logs"} className="ag-courses-item_link">
//          <div className="ag-courses-item_bg"></div>

//          <div className="ag-courses-item_title">New Request For Logs</div>

//          <div className="ag-courses-item_date-box">
//            <div className="card-icons">
//              <img
//                src={require("../assets/images/user-interface.png")}
//                width={100}
//                className="icon-color"
//              />
//            </div>
//          </div>
//        </Link>
//      </div>

//    </div>
//  </div>

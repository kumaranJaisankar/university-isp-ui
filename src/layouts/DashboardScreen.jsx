import React from "react";
import NavBar from "../components/NavBar";
import DashboardBanner from "../components/DashboardBanner";
import "../styles/DashboardScreen.css";
import { Link } from "react-router-dom";

export default function DashboardScreen() {
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
      {/* <DashboardBanner /> */}
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                Filtration Completed Logs{" "}
              </div>

              <div className="ag-courses-item_date-box">
                {/* Start:
                <span className="ag-courses-item_date">04.11.2022</span> */}
                <div className="card-icons">
                  <img
                    src={require("../assets/images/schedule.png")}
                    width={100}
                    className="icon-color"
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                Ongoing Filtration Logs
              </div>

              <div className="ag-courses-item_date-box">
                <div className="card-icons">
                  <img
                    src={require("../assets/images/calendar.png")}
                    width={100}
                    className="icon-color"
                  />
                </div>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <Link to={"/logs"} className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">New Request For Logs</div>

              <div className="ag-courses-item_date-box">
                <div className="card-icons">
                  <img
                    src={require("../assets/images/user-interface.png")}
                    width={100}
                    className="icon-color"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

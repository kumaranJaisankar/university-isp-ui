import React from "react";
import NavBar from "../components/NavBar";
import DashboardBanner from "../components/DashboardBanner";

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
      <DashboardBanner />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="dummy"></div>
        <div className="dummy"></div>
        <div className="dummy"></div>
      </div>
    </div>
  );
}

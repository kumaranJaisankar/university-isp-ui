import React from "react";
import "../styles/dashboard.css";

export default function DashboardBanner() {
  return (
    <div className="dashboard-banner ">
      <div
        className="background-transprent"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-end",
          color: "white",
        }}
      >
        <div style={{ marginRight: "40px", opacity: 1 }}>
          <h2>Active User : 1/50</h2>
          <h2>Active Router: 5/5</h2>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress } from "@mui/material";
import { filteredLogs } from "../axios/ApiService";
import DownloadIcon from "@mui/icons-material/Download";
import PendingActionsIcon from '@mui/icons-material/PendingActions';


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "log_file_name", headerName: "Log Name", width: 150 },
  { field: "start_date", headerName: "start Date", width: 150 },
  {
    field: "end_date",
    headerName: "End Date",
    width: 150,
  },
  {
    field: "start_time",
    headerName: "Start time",
    width: 150,
  },
  {
    field: "end_time",
    headerName: "End Time",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    sortable: false,
    renderCell: (params) => {
      console.log(params);
      return (
        <PendingActionsIcon
          color={params.row.status === "SUCCESS" ? "success" : "warning"}
        />
      );
    },
  },
  

];

// const rows = [
//   { id: 1, lastName: "Snow", logFilename: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", logFilename: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", logFilename: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", logFilename: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", logFilename: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", logFilename: null, age: 150 },
//   { id: 7, lastName: "Clifford", logFilename: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", logFilename: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", logFilename: "Harvey", age: 65 },
// ];



export default function OngoingFilterScreen() {
  const [dataRow, setDataRow] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/logs/filtered-logs/?status=RUNNING")
      .then((response) => response.json())
      .then((data) => {
        setDataRow(data);
        setLoading(false);
        console.log("Data:", data); // Check the data structure
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
    // const getData = async () => {
    //   const response = await filteredLogs();
    //   const { data } = await response;
    //   console.log(data);
    //   console.log("dafadf");
    // };
    // getData();
  }, []);

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
      <h1>Ongoing Logs</h1>
      <div style={{ height: 400, width: "100%" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <DataGrid
            density="comfortable"
            checkboxSelection={false}
            disableColumnFilter={true}
            disableColumnMenu={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            onRowClick={() => console.log("dfs")}
            rows={dataRow}
            columns={columns}
            onColumnHeaderClick={() => console.log("dfd")}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>
    </div>
  );
}

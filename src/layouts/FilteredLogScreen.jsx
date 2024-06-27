import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { filteredLogs } from "../axios/ApiService";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../components/AlertDialog";
import Loader from "../components/Loader";
import { fastMemo } from "@mui/x-data-grid/internals";
import Download from "../components/Download";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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

let rows = [
  {
    id: 5,
    request_id: "dd738057-a5c6-404b-8f0c-d8109fa50ba3",
    log_file_name: "rahul_logs",
    user_id: "2024-05-02 07:38:15.382709+00:00",
    start_date: "2024-05-02",
    start_time: "07:38:15",
    end_date: "2024-05-02",
    end_time: "07:38:15",
    status: "SUCCESS",
    created_at: "2024-05-01T12:37:09.162936Z",
    updated_at: "2024-05-02T09:34:52.393908Z",
  },
  {
    id: 6,
    request_id: "c8debf86-05c9-42ed-98eb-3032784b0505",
    log_file_name: "rahul_1_logs",
    user_id: "VBC0130121",
    start_date: "2024-03-20",
    start_time: "00:00:00",
    end_date: "2024-03-20",
    end_time: "23:59:59",
    status: "SUCCESS",
    created_at: "2024-05-02T07:51:54.013349Z",
    updated_at: "2024-05-02T09:36:55.478868Z",
  },
  {
    id: 7,
    request_id: "ed868d7b-ff17-4b84-b2d1-078c749a65a6",
    log_file_name: "rahul_2_logs",
    user_id: "VBC0130121",
    start_date: "2024-04-20",
    start_time: "00:00:00",
    end_date: "2024-04-20",
    end_time: "23:59:59",
    status: "SUCCESS",
    created_at: "2024-05-02T08:30:27.222780Z",
    updated_at: "2024-05-02T09:23:11.046482Z",
  },
];

export default function FilteredLogScreen() {
  const [open, setOpen] = useState(false);
  const [paramsData, setParams] = useState({});

  const [dataRow, setDataRow] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  function fetchData() {
    fetch("http://127.0.0.1:8000/logs/filtered-logs/?status=SUCCESS")
      .then((response) => response.json())
      .then((data) => {
        setDataRow([...data].reverse());
        setLoading(false);
        console.log("Data:", data); // Check the data structure
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
    // const getData = async () => {
    //   const response = await filteredLogs();
    //   const { data } = await response;
    //   console.log(data);
    //   console.log("dafadf");
    // };
    // getData();
  }, []);

  const downloadFile = (params) => {
    console.log(params.row.logFilename);
    fetch(`http://localhost:8000/logs/download/${params.row.log_file_name}/`)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a blob URL for the downloaded file
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${params.row.log_file_name}.zip`);

        // Append the link to the document body and click it
        document.body.appendChild(link);
        link.click();

        // Clean up after the download
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const columns = [
    {
      field: "index",
      headerName: "S.No",
      filterable: false,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(
          index.row.id + index.row.user_id
        ) + 1,
    },
    { field: "user_id", headerName: "User ID", width: 150 },
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
          <CheckCircleIcon
            color={params.row.status === "SUCCESS" ? "success" : "warning"}
          />
        );
      },
    },

    {
      field: "File",
      headerName: "File",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,

      renderCell: (params) => {
        console.log(params);
        return <Download params={params} />;
      },
    },
    {
      field: "delete",
      headerName: "",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <Button
            variant="contained"
            color="error"
            fullWidth="false"
            style={{
              padding: 0,
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            onClick={() => {
              setOpen(true);
              setParams(params);
            }}
          >
            <DeleteIcon fontSize="small" style={{ color: "white" }} />
          </Button>

          // <Button
          //   variant="contained"
          //   color="primary"
          //   size="small"

          // >
          // </Button>
        );
      },
    },
  ];
  const openClose = () => {
    setOpen(!open);
  };

  const onDelete = () => {
    console.log("delete agude punda");
    fetchData();
  };

  const filterUserId = (e) => {
    setSearchVal(e.target.value);
    console.log(e.target.value);
    const filteredUser = dataRow.filter((val) =>
      val.user_id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataRow(filteredUser);
    if (e.target.value === "") {
      fetchData();
    }
  };

  return (
    <div
      style={{
        margin: "15px",
        overflowX: "hidden",
        // backgroundColor: "red",
        minHeight: "90vh",
        // margin: "20px",
      }}
    >
      {/* <NavBar />
      <h1>Filtered Logs</h1> */}
      <div style={{ height: 400, width: "100%" }}>
        <TextField
          margin="normal"
          name="userId"
          placeholder="Search by UserID.."
          type={"text"}
          id="userId"
          value={searchVal}
          autoComplete="current-password"
          onChange={filterUserId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div onClick={() => {}} style={{ cursor: "pointer" }}>
                  <SearchIcon />
                </div>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                {searchVal != "" && (
                  <div
                    onClick={() => {
                      setSearchVal("");
                      fetchData();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CloseIcon />
                  </div>
                )}
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
        <Loader isLoading={deleteLoad} />
        <AlertDialog
          open={open}
          paramsData={paramsData}
          openClose={openClose}
          setDeleteLoad={setDeleteLoad}
          onDelete={onDelete}
        />
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
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
            getRowId={(row) => row.id + row.user_id}
            localeText={{
              noRowsLabel: "Currently No Filtered Logs",
            }}
            density="comfortable"
            checkboxSelection={false}
            disableColumnFilter={true}
            disableColumnMenu={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            onRowClick={() => console.log("dfs")}
            rows={[...dataRow].reverse()}
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

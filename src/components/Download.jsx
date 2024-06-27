import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, CircularProgress } from "@mui/material";

function Download(props) {
  const [isloading, setloading] = useState(false);
  const downloadFile = (params) => {
    setloading(true);
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
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        console.error("Error downloading file:", error);
        
      });
  };
  return (
    <Button
      // size="small"
      sx={{ px: 2 }}
      style={{
        backgroundColor: "#1565C0",
        width: "80px",

        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={async () => {
        downloadFile(props.params);
      }}
    >
      {isloading ? (
        <CircularProgress style={{ color: "white" }} size={15} />
      ) : (
        <DownloadIcon
          fontSize="small"
          style={{ color: "white", margin: 0, padding: 0 }}
        />
        /* <p
            style={{
              maxWidth: "50px",
              fontSize: "8px",
              textTransform: "lowercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: 0,
              color: "white",
            }}
          >
            {props.params.row.log_file_name}.zip
          </p> */
      )}
    </Button>
  );
}

export default Download;

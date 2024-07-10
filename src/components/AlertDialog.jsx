import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Bounce, toast } from "react-toastify";

export default function AlertDialog({
  open,
  paramsData,
  openClose,
  setDeleteLoad,
  onDelete,
}) {
  //   const [opens, setOpen] = React.useState(false);

  //   //   React.useEffect(() => {
  //   //     setOpen(open);
  //   //   }, []);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleDelete = () => {
    setDeleteLoad(true);
    console.log(`${paramsData.row.log_file_name} deleted`);
    openClose();
    const bodyData = { file_name: paramsData.row.log_file_name };
    fetch(`${process.env.REACT_APP_API_URL_ADMIN}/logs/delete-log-file/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleteLoad(false);

        onDelete();
        toast.success(`Successflly deleted ${paramsData.row.log_file_name}`, {
          position: "bottom-center",
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
        setDeleteLoad(false);
        console.log(error);
        toast.error(error === "" ? error : "Something wrong", {
          position: "bottom-center",
          autoClose: 5000,
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

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={openClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${paramsData?.row?.log_file_name} file?`}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={openClose}>NO</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

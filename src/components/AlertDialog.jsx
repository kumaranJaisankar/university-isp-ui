import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, paramsData, openClose }) {
  //   const [opens, setOpen] = React.useState(false);

  //   //   React.useEffect(() => {
  //   //     setOpen(open);
  //   //   }, []);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleDelete = () => {
    console.log(`${paramsData.row.log_file_name} deleted`);
    openClose();
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

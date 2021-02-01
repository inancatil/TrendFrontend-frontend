import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  confirmAction: <T = unknown>(args?: T) => void;
  title: string;
  message: string;
  dynamicMsgPart?: string;
}

export default function ConfirmationModal(props: IProps) {
  const onOk = () => {
    props.confirmAction();
    props.setIsOpen(false);
  };

  return (
    <Dialog
      fullWidth
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message + " "}
          <span style={{ fontWeight: "bolder" }}>{props.dynamicMsgPart}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setIsOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={onOk} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

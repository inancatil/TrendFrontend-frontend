import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "../../config/axios-config";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface IProps {
  children: React.ReactNode;
}
/**
 * 404 DIŞINDA BU MODALI GÖSTER
 * @param children
 */
export default function ErrorHandler({ children }: IProps) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.interceptors.request.use((req) => {
      setError("");
      return req;
    });
    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status !== 404) {
          setOpen(true);
          setError(
            error.response.data.error.messages.map((e, i) => <p key={i}>{e}</p>)
          );
        }
      }
    );
    return () => {
      setError("");
    };
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Error</h2>
          {error}
        </div>
      </Modal>
      {children}
    </>
  );
}

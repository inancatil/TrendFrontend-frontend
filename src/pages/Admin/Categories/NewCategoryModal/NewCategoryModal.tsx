import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useHttpCategory from "../../../../hooks/api/useHttpCategory";

interface INewCategoryModalProps {
  open: boolean;
  setOpen: (x: boolean) => void;
}

export default function NewCategoryModal({
  open,
  setOpen,
}: INewCategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const httpCategory = useHttpCategory();
  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
  };

  const onSubmit = () => {
    httpCategory.addNewCategory(categoryName).finally(() => {
      setCategoryName("");
      setOpen(false);
    });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(v) => setCategoryName(v.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

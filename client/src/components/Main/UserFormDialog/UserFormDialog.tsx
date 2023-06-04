import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { UserDialog } from "../../../models/userDialog";

const UserFormDialog: React.FC<UserDialog> = (props) => {
  return (
    <div>
      <Dialog open={props.isOpen}>
        <DialogTitle>Enter Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={props.username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.handleChange(event)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSubmit}>Enter Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserFormDialog;

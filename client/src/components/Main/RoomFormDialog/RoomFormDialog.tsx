import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { RoomDialogProps } from "../../../models/roomDialog";

const RoomFormDialog: React.FC<RoomDialogProps> = (props) => {
  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <DialogTitle>Enter Joining Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="room"
            label="Room"
            type="text"
            name="room"
            fullWidth
            variant="outlined"
            value={props.user.room}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.handleChange(event)
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="name"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={props.user.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.handleChange(event)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSubmit}>Join Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomFormDialog;

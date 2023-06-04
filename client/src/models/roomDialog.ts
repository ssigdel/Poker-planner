type User = {
  room: string;
  name: string;
};

export type RoomDialogProps = {
  isOpen: boolean;
  user: User;
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

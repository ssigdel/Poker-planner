export type UserDialog = {
  isOpen: boolean;
  username: string;
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

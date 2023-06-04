const isUserAdmin: (roomId: string | undefined) => boolean = (roomId) => {
  const userId = localStorage.getItem("userId");

  if (roomId === userId) return true;

  return false;
};

export default isUserAdmin;

const checkUserStatus = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.status === "admin") {
    return true;
  } else {
    return false;
  }
};

export default checkUserStatus;

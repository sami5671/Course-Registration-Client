const UserCoursesInfo = () => {
  const userCourse = JSON.parse(localStorage.getItem("userCourses"));

  if (userCourse) {
    return userCourse;
  } else {
    return null;
  }
};

export default UserCoursesInfo;

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Course from "../Course/Course";

const Courses = ({
  handleAddToLog,
  handleCreditHourCount,
  handleAddToLogPrice,
  handleRemovalCourse,
}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {courses?.map((course) => (
        <Course
          id={course._id}
          handleAddToLog={handleAddToLog}
          handleCreditHourCount={handleCreditHourCount}
          handleAddToLogPrice={handleAddToLogPrice}
          key={course._id}
          course={course}
          handleRemovalCourse={handleRemovalCourse}
        ></Course>
      ))}
    </div>
  );
};

Courses.propTypes = {
  handleAddToLog: PropTypes.func.isRequired,
  handleCreditHourCount: PropTypes.func.isRequired,
  handleAddToLogPrice: PropTypes.func.isRequired,
  handleRemovalCourse: PropTypes.func.isRequired,
};

export default Courses;

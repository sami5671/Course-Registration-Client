import { useState } from "react";
import "./App.css";
import CourseLog from "./Components/CourseLog/CourseLog";
import Courses from "./Components/Courses/Courses";
import logo from "../src/assets/course-logo.png";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import checkUserStatus from "./Hooks/CheckUser";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [logs, setLogs] = useState([]); // add to log function state
  const [remaining, setRemaining] = useState(20); // credit hour count function state
  const [price, setPrice] = useState(0); // add price function state
  const [hours, setHours] = useState(0); // add hours function state

  // add to log function
  const handleAddToLog = (course) => {
    const newLogs = [...logs, course];
    setLogs(newLogs);
  };

  // add to price
  const handleAddToLogPrice = (cPrice) => {
    const newPrice = price + cPrice;
    setPrice(newPrice);
  };

  // add credit hour
  const handleAddHours = (creditHour) => {
    const newHours = hours + creditHour;
    setHours(newHours);
  };

  // credit Hour count function (remaining hours)
  const handleCreditHourCount = (hrs) => {
    if (hrs <= remaining) {
      handleAddHours(hrs);
      setRemaining(remaining - hrs);
      return true; // Course was successfully added
    } else {
      Swal.fire({
        title: "Warning!",
        text: "Credit limit has been reached. You can deselect courses to adjust your choice",
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          popup: "rounded-lg p-6",
          confirmButton: "custom-swal-button",
        },
        buttonsStyling: false,
      });
      return false; // course was not successfully added
    }
  };

  // remove course function
  const handleRemovalCourse = (cprice, creditHour, _id) => {
    const filteredLogs = logs.filter((course) => course._id !== _id);
    setLogs(filteredLogs);

    const newPrice = price - cprice;
    setPrice(newPrice);

    const newCreditHour = hours - creditHour;
    setHours(newCreditHour);

    const remainingAfterDeselect = remaining + creditHour;
    setRemaining(remainingAfterDeselect);
  };

  return (
    <>
      <Navbar />
      <div
        data-aos="fade-up"
        className="bg-pinkviolet p-10 rounded-lg shadow-lg"
      >
        {/* Header */}
        <h2
          data-aos="flip-down"
          className="flex items-center gap-10 justify-center text-6xl text-crimson mt-12 mb-20 font-extrabold tracking-wide"
        >
          <img className="w-20" src={logo} alt="" /> Course Registration
        </h2>

        {/* Main Section */}
        <div className="flex gap-6 justify-between">
          <div className="w-full md:w-3/4 p-8 shadow-lg rounded-xl">
            <Courses
              handleAddToLog={handleAddToLog}
              handleCreditHourCount={handleCreditHourCount}
              handleAddToLogPrice={handleAddToLogPrice}
              handleRemovalCourse={handleRemovalCourse}
            />
          </div>

          <div className="w-full md:w-1/4 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
            <CourseLog
              logs={logs}
              remaining={remaining}
              price={price}
              hours={hours}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

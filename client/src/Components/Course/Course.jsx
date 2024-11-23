import PropTypes from "prop-types";
import { FaDollarSign, FaBookOpen } from "react-icons/fa";
import "./Course.css";
import { useState } from "react";
import garbage from "../../assets/recycling-bin.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import UserInfo from "../../Hooks/userInfo";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import UserCoursesInfo from "./../../Hooks/UserCoursesInfo";

const Course = ({
  id,
  course,
  handleAddToLog,
  handleCreditHourCount,
  handleAddToLogPrice,
  handleRemovalCourse,
}) => {
  const user = UserInfo();
  const { course_title, course_details, course_img, credit_hrs, price, _id } =
    course;
  const userCourse = UserCoursesInfo();
  const [isDisabled, setIsDisabled] = useState(false);

  // Check if course_title exists in userCourse array
  const isCourseEnrolled = userCourse?.some(
    (userCourseItem) => userCourseItem.course_title === course_title
  );

  // Function to handle adding course
  const handleClick = () => {
    const canAddCourse = handleCreditHourCount(credit_hrs);
    if (canAddCourse) {
      handleAddToLog(course);
      handleAddToLogPrice(price);
      setIsDisabled(true);
    }
  };

  // Function to handle removing course
  const handleDeselect = () => {
    handleRemovalCourse(price, credit_hrs, _id);
    setIsDisabled(false); // Re-enable the button after deselecting
  };

  const handleDelete = async (id) => {
    // Show SweetAlert confirmation before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, this action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make API call to delete the product
          const response = await fetch(
            `http://localhost:5000/deleteCourse/${id}`,
            {
              method: "DELETE", // DELETE request
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            // Handle successful deletion, maybe remove it from the UI
            Swal.fire("Deleted!", "Your course has been deleted.", "success");
            // Optionally, refresh or update the UI
          } else {
            Swal.fire("Error!", "Failed to delete the course.", "error");
          }
        } catch (error) {
          console.error("Error deleting the product:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } else {
        // User canceled the delete action
        Swal.fire("Cancelled", "Your course is safe :)", "info");
      }
    });
  };

  // Sanitize and slice course_details for readable text
  const getSlicedDetails = () => {
    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(course_details);
    // Create a plain text version by removing HTML tags
    const plainText = sanitizedContent.replace(/<[^>]*>/g, "");
    // Slice to 20 words and add "..." if longer
    return plainText.split(" ").slice(0, 12).join(" ") + "...";
  };

  const buttonContent =
    user?.status === "admin" ? (
      <Link
        to={`/update/${id}`}
        className="w-3/4 text-lg bg-pink-500 rounded-2xl text-white py-2 text-center"
      >
        <button>update</button>
      </Link>
    ) : (
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`w-3/4 text-lg text-white py-2.5 rounded-xl selectBtn transition-colors duration-300 ${
          isDisabled ? "bg-gray-400" : "bg-violet hover:bg-pink-500"
        }`}
      >
        {isDisabled ? "Selected" : "Select"}
      </button>
    );

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      data-aos="zoom-in"
      className="p-6 bg-gradient-to-t from-gray-100 to-violet rounded-2xl transition duration-300 flex flex-col h-full cursor-pointer"
    >
      <img
        className="max-w-full w-full h-48 object-cover rounded-lg"
        src={course_img}
        alt=""
      />

      <h3 className="font-extrabold text-xl mt-4 mb-3 text-fuchsia-950 hover:text-pink-800 transition-colors">
        {course_title}
      </h3>

      <p className="text-black text-[1.08rem] mb-5 font-sans">
        {getSlicedDetails()}
      </p>

      <div className="flex items-center justify-between mb-6 text-gray-900">
        <p className="flex items-center">
          <FaDollarSign className="text-pink-700" />{" "}
          <span className="ml-1.5 font-semibold">Price: {price}</span>
        </p>
        <p className="flex items-center">
          <FaBookOpen className="text-pink-700" />{" "}
          <span className="ml-2 font-semibold">Credit: {credit_hrs} hrs</span>
        </p>
      </div>

      {/* Ensure this section stays at the bottom */}
      <div className="mt-auto flex items-center justify-between">
        {isCourseEnrolled ? (
          <>
            <Link to={`/courseDetails/${id}`}>
              <button className="bg-pink-500 py-2 px-3 rounded-xl text-white font-bold">
                Learn Now
              </button>
            </Link>
          </>
        ) : (
          buttonContent
        )}

        {user?.status === "admin" ? (
          <button onClick={() => handleDelete(id)} className="text-red-400">
            <img src={garbage} alt="Garbage Icon" />
          </button>
        ) : (
          <button
            disabled={!isDisabled}
            onClick={handleDeselect}
            className={`p-2 rounded-lg bg-paleindigo hover:bg-superpink transition-colors duration-300 ${
              !isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <img src={garbage} alt="Garbage Icon" />
          </button>
        )}
      </div>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.object.isRequired,
  handleAddToLog: PropTypes.func.isRequired,
  handleCreditHourCount: PropTypes.func.isRequired,
  handleAddToLogPrice: PropTypes.func.isRequired,
  handleRemovalCourse: PropTypes.func.isRequired,
};

export default Course;

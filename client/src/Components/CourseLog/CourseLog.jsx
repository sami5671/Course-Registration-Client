import PropTypes from "prop-types";
import SingleLog from "../SingleLog/SingleLog";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import UserInfo from "../../Hooks/userInfo";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const CourseLog = ({ logs }) => {
  const user = UserInfo();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardCVV: "",
  });
  const navigate = useNavigate(); // Added navigation hook

  // Calculate total credit hours and price dynamically
  const totalHours = logs.reduce((sum, log) => {
    const creditHrs = parseInt(log.credit_hrs, 10) || 0;
    return sum + creditHrs;
  }, 0);

  const totalPrice = logs.reduce((sum, log) => {
    const price = parseFloat(log.price) || 0;
    return sum + price;
  }, 0);

  console.log("Total Hours:", totalHours, "Total Price:", totalPrice);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle Pay Button Click
  const handlePayment = async () => {
    const courseDetails = logs.map((log) => ({
      course_title: log.course_title,
      price: log.price,
      credit_hrs: log.credit_hrs,
    }));

    // Show dummy card form
    Swal.fire({
      title: "Enter Card Details",
      html: `
        <label>Card Number:</label>
        <input type="text" id="cardNumber" class="swal2-input" placeholder="Card Number" maxlength="16" pattern="\d{16}" required>
        <label>CVV:</label>
        <input type="text" id="cardCVV" class="swal2-input" placeholder="CVV" maxlength="3" pattern="\d{3}" required>
      `,
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const cardNumber = document.getElementById("cardNumber").value;
        const cardCVV = document.getElementById("cardCVV").value;
        setCardDetails({ cardNumber, cardCVV });

        // Validate card details
        if (
          !cardNumber ||
          !cardCVV ||
          cardNumber.length !== 16 ||
          cardCVV.length !== 3
        ) {
          Swal.showValidationMessage("Please enter valid card details.");
          return false;
        }
        return true;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Payment Successful!",
          "Thank you for your purchase.",
          "success"
        );

        let existingCourses = [];
        try {
          const storedCourses = localStorage.getItem("userCourses");
          if (storedCourses) {
            existingCourses = JSON.parse(storedCourses);
          }
        } catch (error) {
          console.error("Error parsing stored courses:", error);
          existingCourses = [];
        }

        const updatedCourses = [...existingCourses, ...courseDetails];

        localStorage.setItem("userCourses", JSON.stringify(updatedCourses));

        try {
          const response = await fetch(
            `http://localhost:5000/userUpdate/${user._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(courseDetails),
            }
          );

          if (response.ok) {
            const result = await response.json();
            console.log("User updated successfully:", result);
            navigate("/"); // Redirect to the home or courses page
          } else {
            Swal.fire("Error", "Failed to update user courses.", "error");
          }
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire("Error", "There was an issue updating your data.", "error");
        }
      }
    });
  };

  return (
    <>
      {user?.status === "admin" ? (
        ""
      ) : (
        <div
          data-aos="fade-right"
          className="bg-gradient-to-t from-gray-100 to-pinkish rounded-lg p-6 shadow-lg"
        >
          <hr className="border-pink-700 mb-4" />

          <h2 className="font-bold text-2xl text-pink-950 mt-4 mb-5">
            Course Log: {logs.length}
          </h2>
          {logs.map((log, idx) => (
            <SingleLog
              key={idx}
              log={log}
              className="text-gray-700 font-medium my-3"
            />
          ))}
          <hr className="border-pink-700 mt-6" />

          <h2 className="my-4 text-pink-900 text-lg font-semibold">
            Total Credit Hour: {totalHours}
          </h2>
          <hr className="border-pink-700" />

          <h2 className="mt-4 text-pink-900 font-semibold text-lg">
            Total Price: {totalPrice.toFixed(2)} USD
          </h2>

          {/* Pay Button */}
          {user?.status === "user" ? (
            <button
              onClick={handlePayment}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Pay Now
            </button>
          ) : (
            <Link to="/login">
              <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition duration-300">
                Pay Now
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

CourseLog.propTypes = {
  logs: PropTypes.array.isRequired, // List of selected courses
};

export default CourseLog;

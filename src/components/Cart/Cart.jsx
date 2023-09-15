/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./Cart.css";
const Cart = ({
  selectedCourse,
  totalPrice,
  remainingCreditHour,
  totalCreditHour,
}) => {
  //   console.log(selectedCourse);
  return (
    <div className="cart-container">
      <h4 className="credit-heading">
        Credit Hour Remaining {remainingCreditHour} hr
      </h4>
      <hr />
      <h2>Course Name</h2>
      <hr />
      {selectedCourse.map((course, count) => (
        <li key={course.id}>
          {count + 1}. {course.heading}
        </li>
      ))}
      <h4>Total Credit Hour: {totalCreditHour}</h4>
      <hr />
      <h4>Total Price: {totalPrice} USD</h4>
    </div>
  );
};

export default Cart;

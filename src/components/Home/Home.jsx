import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import "./Home.css";
const Home = () => {
  // ==============================React State declaration===================================
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remainingCreditHour, setRemainingCreditHour] = useState(0);
  const [totalCreditHour, setTotalCreditHour] = useState([]);
  // =========================Fetching the data from Public(data.json) file step 1========================================
  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllCourses(data));
  }, []);
  //   console.log(allCourses);

  //   =========================Step 2: handle the selected course data ========================================
  const handleSelectCourse = (course) => {
    // console.log(course);
    let maxCreditHour = 20;
    let initialCredit = course.credit_hour;
    const isExist = selectedCourse.find((item) => item.id === course.id);
    let totalPrice = course.price;
    if (isExist) {
      return alert("Have Already taken !!!!");
    } else {
      selectedCourse.forEach((item) => {
        totalPrice = totalPrice + item.price;
      });
    }
    // for calculating course credit
    selectedCourse.forEach((item) => {
      initialCredit = initialCredit + item.credit_hour;
    });
    const remainingCreditHour = 20 - initialCredit;
    if (initialCredit > maxCreditHour) {
      return alert("Credit House exceeded maximum credit hour!!!!");
    }

    setRemainingCreditHour(remainingCreditHour);
    setTotalCreditHour(initialCredit);
    setTotalPrice(totalPrice);
    setSelectedCourse([...selectedCourse, course]);
  };
  return (
    <div className="container">
      <div className="home-container">
        <div className="card-container">
          {allCourses.map((course) => (
            <div key={course.id} className="card">
              <div className="card-img">
                <img className="photo" src={course.image} alt="" />
              </div>
              <h3>{course.heading}</h3>
              <p>
                <small>{course.des}</small>
              </p>
              <div className="information">
                <p>Price: {course.price} </p>
                <p>Credit Hour: {course.credit_hour} hr</p>
              </div>
              <button
                className="card-btn"
                onClick={() => handleSelectCourse(course)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="cart">
          <Cart
            selectedCourse={selectedCourse}
            totalPrice={totalPrice}
            remainingCreditHour={remainingCreditHour}
            totalCreditHour={totalCreditHour}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;

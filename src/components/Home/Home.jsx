import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import "./Home.css";
const Home = () => {
  // ==============================React State declaration===================================
  const [allCourses, setAllCourses] = useState([]);
  // =========================Fetching the data from Public(data.json) file step 1========================================
  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllCourses(data));
  }, []);
  //   console.log(allCourses);
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
              <button className="card-btn">Select</button>
            </div>
          ))}
        </div>
        <div className="cart">
          <Cart></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;

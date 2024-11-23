import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data.newUser));
      alert("Registration successful!");
      navigate("/");
      console.log(data);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-slate-100">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-6 lg:p-12 shadow-lg rounded-lg bg-gray-800">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-br from-cyan-200 to-pink-500 text-transparent bg-clip-text">
            Course Registration
          </h2>
          <p className="text-gray-400 mb-4">
            Sign up to access exclusive features and connect with others.
          </p>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <button className="hover:underline hover:text-pink-500 text-gray-100">
                Login
              </button>
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[400px]">
          <div className="p-6 bg-gray-700 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-br from-pink-500 to-cyan-200 text-transparent bg-clip-text">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} noValidate="" className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name Here"
                  className="w-full px-4 py-2 border rounded-md border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-4 py-2 border rounded-md border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="*******"
                  className="w-full px-4 py-2 border rounded-md border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-3 text-white rounded-md ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

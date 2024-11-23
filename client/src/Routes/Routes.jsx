import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Add from "../Components/Admin/Add";
import Update from "../Components/Admin/Update";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AdminRoute from "./AdminRoute";
import CourseDetails from "../Components/CourseDetails/CourseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/add",
    element: (
      <AdminRoute>
        <Add></Add>
      </AdminRoute>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <AdminRoute>
        <Update></Update>
      </AdminRoute>
    ),
    loader: ({ params }) => fetch(`http://localhost:5000/update/${params.id}`),
  },
  {
    path: "/courseDetails/:id",
    element: <CourseDetails></CourseDetails>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/courseAccess/${params.id}`),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;

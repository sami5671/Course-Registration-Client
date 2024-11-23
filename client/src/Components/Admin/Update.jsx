import { useState, useRef, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const Update = () => {
  const data = useLoaderData(); // Load data passed to this component
  const navigate = useNavigate();

  // Local state to hold form data
  const [formData, setFormData] = useState({
    course_img: data.course_img || "",
    course_title: data.course_title || "",
    course_details: data.course_details || "",
    credit_hrs: data.credit_hrs || "",
    price: data.price || "",
    video_link: data.video_link || "",
    thumbnail_img: data.thumbnail_img || "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const editor = useRef(null);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Update course details...",
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditorChange = (newContent) => {
    setFormData({
      ...formData,
      course_details: newContent,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/courseUpdate/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Course updated successfully:", result);
        setSubmitStatus("Course updated successfully!");
        navigate("/"); // Redirect to courses or another page
      } else {
        setSubmitStatus("Failed to update course");
      }
    } catch (error) {
      setSubmitStatus("Error occurred while updating");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-fuchsia-900 to-violet">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="font-extrabold text-4xl text-center mb-8 text-pink-600 hover:text-pink-400 transition-colors">
          Update Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Course Image URL
              </label>
              <input
                type="text"
                name="course_img"
                value={formData.course_img}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter course image URL"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="course_title"
                value={formData.course_title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Credit Hours
              </label>
              <input
                type="number"
                name="credit_hrs"
                value={formData.credit_hrs}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter credit hours"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                YouTube Thumbnail Link
              </label>
              <input
                type="text"
                name="thumbnail_img"
                value={formData.thumbnail_img}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter thumbnail image URL"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                YouTube Video Link
              </label>
              <input
                type="text"
                name="video_link"
                value={formData.video_link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                placeholder="Enter video link"
                required
              />
            </div>
          </div>

          {/* Editor */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Course Details
            </label>
            <JoditEditor
              ref={editor}
              value={formData.course_details}
              config={editorConfig}
              tabIndex={1}
              onBlur={handleEditorChange}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full text-lg font-semibold bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Update Course
          </button>
        </form>

        {/* Feedback Message */}
        {submitStatus && (
          <p className="mt-6 text-center text-lg text-gray-600 italic">
            {submitStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Update;

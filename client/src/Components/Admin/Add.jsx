import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Add = () => {
  const initialFormState = {
    course_img: "",
    course_title: "",
    course_details: "",
    credit_hrs: "",
    price: "",
    video_link: "https://www.youtube.com/embed/YouTube-Key",
    thumbnail_img: "https://i3.ytimg.com/vi/YouTube-Key/maxresdefault.jpg",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitStatus, setSubmitStatus] = useState("");

  const editor = useRef(null);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter course details...",
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
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setSubmitStatus("Course added successfully!");
        setFormData(initialFormState);
      } else {
        setSubmitStatus("Failed to add course");
      }
    } catch (error) {
      setSubmitStatus("Error occurred while submitting");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-fuchsia-900 to-violet">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="font-extrabold text-4xl text-center mb-8 text-pink-600 hover:text-pink-400 transition-colors">
          Add New Course
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
            Add Course
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

export default Add;

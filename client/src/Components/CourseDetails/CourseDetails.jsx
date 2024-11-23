import React from "react";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";

const CourseDetails = () => {
  const data = useLoaderData();
  console.log(data);

  // Sanitize course description to avoid XSS
  const sanitizedCourseDetails = DOMPurify.sanitize(data.course_details);

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-10">
        <h1 className="text-4xl font-semibold text-pink-600 mb-6">
          {data.course_title}
        </h1>
        <p
          className="text-xl text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: sanitizedCourseDetails }}
        ></p>
      </div>

      {/* Course Details and Video Section */}
      <div className="flex justify-between space-x-8 bg-white shadow-xl rounded-lg p-8 mb-10">
        {/* YouTube Video */}
        <div className="w-full md:w-1/2">
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={data?.video_link}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Course Information */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-pink-600 mb-6">
            Course Information
          </h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center">
              <span className="font-semibold text-pink-600 w-40">
                Credit Hours:
              </span>
              {data.credit_hrs}
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-pink-600 w-40">Price:</span>$
              {data.price}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

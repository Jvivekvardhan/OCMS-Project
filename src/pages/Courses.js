import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseContent from "./CourseContent";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:8080/users/${userId}/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Enrolled successfully");
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4">
            <div className="card p-3 mb-3">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <p>₹{course.price}</p>

              <button
                className="btn btn-primary mb-2"
                onClick={() => enrollCourse(course.id)}
              >
                Enroll
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedCourseId(course.id)}
              >
                View Content
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show Course Content */}
      {selectedCourseId && <CourseContent courseId={selectedCourseId} />}
    </div>
  );
}

export default Courses;

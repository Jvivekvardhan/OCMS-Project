import React, { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  const fetchMyCourses = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching enrolled courses", error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <p>No enrolled courses</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>{course.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;

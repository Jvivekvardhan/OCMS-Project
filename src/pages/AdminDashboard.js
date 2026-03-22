import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // Course fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Lesson fields
  const [lessonTitle, setLessonTitle] = useState("");
  const [type, setType] = useState("VIDEO");
  const [content, setContent] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const token = localStorage.getItem("token");

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

  // ✅ CREATE COURSE
  const createCourse = async () => {
    try {
      await axios.post(
        "http://localhost:8080/courses",
        { title, description, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Course created");

      setTitle("");
      setDescription("");
      setPrice("");

      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  // ✅ DELETE COURSE
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted");

      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD LESSON
  const addLesson = async () => {
    if (!selectedCourseId) {
      alert("Select course first");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/lessons/${selectedCourseId}`,
        {
          title: lessonTitle,
          type: type,
          content: content,
          orderNumber: orderNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Lesson added!");

      setLessonTitle("");
      setContent("");
      setOrderNumber("");
    } catch (err) {
      console.error(err);
      alert("Failed to add lesson");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* CREATE COURSE */}
      <div className="card p-3 mb-4">
        <h4>Create Course</h4>

        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="btn btn-success" onClick={createCourse}>
          Create Course
        </button>
      </div>

      {/* COURSE LIST */}
      <h4>Courses</h4>

      {courses.map((course) => (
        <div key={course.id} className="card p-2 mb-2">
          <b>{course.title}</b>

          <button
            className="btn btn-danger mt-2"
            onClick={() => deleteCourse(course.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* ADD LESSON */}
      <div className="card p-3 mt-4">
        <h4>Add Lesson</h4>

        <select
          className="form-control mb-2"
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option>Select Course</option>

          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          className="form-control mb-2"
          placeholder="Lesson Title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="VIDEO">Video</option>
          <option value="ARTICLE">Article</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Content (URL or Text)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addLesson}>
          Add Lesson
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function CourseContent({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // ✅ useCallback fix (IMPORTANT)
  const fetchLessons = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/lessons/${courseId}`);
      setLessons(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [courseId]);

  // ✅ useEffect fix (IMPORTANT)
  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return (
    <div className="container mt-4">
      <h3>Course Content</h3>

      <div className="row">
        {/* LEFT SIDE - LESSON LIST */}
        <div className="col-md-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="card p-2 mb-2"
              onClick={() => setSelectedLesson(lesson)}
              style={{ cursor: "pointer" }}
            >
              {lesson.orderNumber}. {lesson.title}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="col-md-8">
          {selectedLesson ? (
            selectedLesson.type === "VIDEO" ? (
              <iframe
                width="100%"
                height="400"
                src={selectedLesson.content}
                title="video"
              ></iframe>
            ) : (
              <p>{selectedLesson.content}</p>
            )
          ) : (
            <p>Select a lesson</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseContent;

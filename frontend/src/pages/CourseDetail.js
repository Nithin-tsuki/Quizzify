import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5001/api/courses`);
      const found = res.data.find(c => c._id === courseId);
      setCourse(found);
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-detail">
      <h2>{course.courseName}</h2>
      <h4>Instructor: {course.instructorName}</h4>
      <h5>Topics:</h5>
      <ul>
        {course.topics.map((topic, idx) => (
          <li key={idx}>
            <h4>{topic.title}</h4>
            {topic.video && <video controls src={topic.video} width="400" />}
            {topic.note && <p>{topic.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;

import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]); // State to store attendance data

  useEffect(() => {
    fetchAttendance(); // Call the function when the component loads
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Send auth token
      });
      setAttendance(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {attendance.length > 0 ? (
          attendance.map((record, index) => (
            <li key={index}>
              {new Date(record.date).toLocaleDateString()} - {record.status}
            </li>
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </ul>
    </div>
  );
};

export default Attendance;

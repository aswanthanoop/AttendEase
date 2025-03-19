const markAttendance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance",
        { status: "Present" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Attendance marked!");
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };


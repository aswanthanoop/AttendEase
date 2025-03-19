import React, { useState } from "react";
import { Mic, CheckCircle, List, Settings } from "lucide-react";

const VoiceAssistantDashboard = () => {
  const [attendance, setAttendance] = useState("Not Marked");
  const [tasks, setTasks] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes("mark attendance")) {
        setAttendance("✅ Present");
      } else if (transcript.includes("add task")) {
        const newTask = transcript.replace("add task", "").trim();
        if (newTask) setTasks([...tasks, newTask]);
      }
    };
    recognition.start();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Voice assistant based Attendance
      and task management system</h1>

      {/* Attendance Section */}
      <div style={styles.card}>
        <h2>🎓 Attendance</h2>
        <p style={styles.status}>{attendance}</p>
        <button onClick={() => setAttendance("✅ Present")} style={styles.button}>
          <CheckCircle size={18} /> Mark Present
        </button>
      </div>

      {/* Task Management Section */}
      <div style={styles.card}>
        <h2>📋 Task Management</h2>
        <ul style={styles.taskList}>
          {tasks.length > 0 ? tasks.map((task, index) => (
            <li key={index} style={styles.taskItem}>📌 {task}</li>
          )) : <p>No tasks added.</p>}
        </ul>
      </div>

      {/* Voice Assistant Section */}
      <div style={styles.voiceBox}>
        <h2>Voice Assistant</h2>
        <button onClick={handleVoiceCommand} style={styles.voiceButton}>
          <Mic size={20} /> {isListening ? "Listening..." : "Start Voice Command"}
        </button>
      </div>

      {/* Settings & Reports */}
      <div style={styles.settings}>
        <button style={styles.settingsButton}><List size={18} /> View Reports</button>
        <button style={styles.settingsButton}><Settings size={18} /> Settings</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(135deg,rgb(154, 210, 255),rgb(72, 61, 227))",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    margin: "20px auto",
    width: "80%",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  status: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: "10px",
  },
  button: {
    background: "#28a745",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#218838",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    background: "#f8d7da",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "8px",
  },
  voiceBox: {
    marginTop: "20px",
  },
  voiceButton: {
    background: "#007bff",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  settings: {
    marginTop: "30px",
  },
  settingsButton: {
    background: "#ffc107",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    margin: "5px",
    cursor: "pointer",
  }
};

export default VoiceAssistantDashboard;

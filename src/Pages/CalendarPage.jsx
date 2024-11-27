import React from "react";
import CalendarView from "../components/CalendarView";
import "../Styles/CalendarPage.css"; // Optional: Add custom styles

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <h1>Workout Schedule Calendar</h1>
      <CalendarView />
    </div>
  );
};

export default CalendarPage;
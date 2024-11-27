import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddScheduleModal from "./AddScheduleModal";
import { UserContext } from "../Utils/UserContext";
import "../Styles/CalendarView.css";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedDateRange, setClickedDateRange] = useState(null);
  const { currentUser, authToken } = useContext(UserContext);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        `https://dropweightbackend.azurewebsites.net/user/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedEvents = data.map((schedule) => ({
          id: schedule.workoutScheduleId,
          title: `${schedule.workoutType} (${schedule.reps} reps)`,
          start: schedule.startTime,
          end: schedule.endTime,
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [authToken, currentUser]);

  const handleDateClick = (info) => {
    setClickedDateRange({ start: info.dateStr, end: info.dateStr }); 
    setModalOpen(true);
  };

  const handleEventAdd = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div>
      <h2>Workout Schedule Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        dateClick={handleDateClick} 
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={false}
      />
      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddSchedule={handleEventAdd}
        clickedDateRange={clickedDateRange}
      />
    </div>
  );
};

export default CalendarView;

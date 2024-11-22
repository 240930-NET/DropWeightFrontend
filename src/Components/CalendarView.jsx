import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserContext } from "../Utils/UserContext"; 
import { useNavigate } from "react-router-dom";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const { currentUser, authToken } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!authToken || !currentUser) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/workout-schedules/user/${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.map((schedule) => ({
            id: schedule.WorkoutScheduleId,
            title: `${schedule.WorkoutType} (${schedule.Reps} reps)`,
            start: schedule.StartTime,
            end: schedule.EndTime,
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Failed to fetch workout schedules.");
        }
      } catch (error) {
        console.error("Error fetching workout schedules:", error);
      }
    };

    fetchSchedules();
  }, [authToken, currentUser, navigate]);

  return (
    <div>
      <h2>Workout Schedule Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={false}
        eventClick={(info) => {
          alert(`Workout: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`);
        }}
        allDaySlot={false}
      />
    </div>
  );
};

export default CalendarView;

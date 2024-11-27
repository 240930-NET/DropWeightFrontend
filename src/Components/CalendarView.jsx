import React, { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Needed for interactions like select
import AddScheduleModal from "./AddScheduleModal";
import { UserContext } from "../Utils/UserContext";
import "../Styles/CalendarView.css";

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedDateRange, setClickedDateRange] = useState(null);
  const { currentUser, authToken } = useContext(UserContext);

  // Fetch workout schedules for the user
  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        `http://localhost:5276/api/workout-schedules/user/${currentUser.userId}`,
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

  // Handle date selection on the calendar
  const handleDateSelect = (info) => {
    setClickedDateRange({
      start: info.startStr,
      end: info.endStr,
    });
    setModalOpen(true);
  };

  const handleAddSchedule = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div>
      <h2>Workout Schedule Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true} // Enables selection of calendar cells
        select={handleDateSelect} // Triggered on date click/drag
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={false}
      />
      {isModalOpen && (
        <AddScheduleModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddSchedule={handleAddSchedule}
          clickedDateRange={clickedDateRange}
        />
      )}
    </div>
  );
};

export default CalendarView;

import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Utils/UserContext";
import "../Styles/AddScheduleModal.css";

const AddScheduleModal = ({ isOpen, onClose, onAddSchedule, clickedDateRange }) => {
  const { currentUser, authToken } = useContext(UserContext);
  const workouts = currentUser?.workouts || [];
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (clickedDateRange) {
      setStartTime(clickedDateRange.start);
      setEndTime(clickedDateRange.end);
    }
  }, [clickedDateRange]);

  const handleAddSchedule = async () => {
    if (!startTime || !endTime) {
      alert("Start and end times are required!");
      return;
    }

    const scheduleData = {
      StartTime: new Date(startTime).toISOString(),
      EndTime: new Date(endTime).toISOString(),
      WorkoutId: selectedWorkoutId ? parseInt(selectedWorkoutId, 10) : null,
      UserId: currentUser.userId,
    };

    try {
      const response = await fetch("http://localhost:5276/api/workout-schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        const addedSchedule = await response.json();
        const formattedEvent = {
          id: addedSchedule.workoutScheduleId,
          title: addedSchedule.workoutType
            ? `${addedSchedule.workoutType} (${addedSchedule.reps} reps)`
            : 1,
          start: addedSchedule.startTime,
          end: addedSchedule.endTime,
        };
        onAddSchedule(formattedEvent);
        onClose();
      } else {
        alert("Failed to add schedule. Please try again.");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Workout Schedule</h2>
        <div>
          <label htmlFor="workout">Workout (optional):</label>
          <select
            id="workout"
            value={selectedWorkoutId}
            onChange={(e) => setSelectedWorkoutId(e.target.value)}
          >
            <option value="">No Workout</option>
            {workouts.map((workout) => (
              <option key={workout.workoutId} value={workout.workoutId}>
                {workout.type} ({workout.reps} reps)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleAddSchedule}>Add Schedule</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddScheduleModal;

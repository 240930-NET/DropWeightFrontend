import React from "react";
import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const WorkoutList = ({ workouts, onDelete }) => {
    return (
        <Container>
            <h3>All Workouts</h3>
            <ListGroup>
                {workouts.map((workout) => (
                    <ListGroupItem key={workout.workoutId} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{workout.type}</strong> - {new Date(workout.startTime).toLocaleString()} <br />
                            Reps: {workout.reps || "N/A"}
                        </div>
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: "pointer", color: "gray" }}
                            onClick={() => onDelete(workout.workoutId)}
                        />
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default WorkoutList;

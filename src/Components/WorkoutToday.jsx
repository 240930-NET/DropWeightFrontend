import React from "react";
import { Card, CardBody, Container } from "reactstrap";

const WorkoutToday = ({ workouts }) => (
    <Container>
        <h3>Today's Workouts</h3>
        {workouts.length === 0 ? (
            <p>No workouts for today</p>
        ) : (
            <Card className="mt-3">
                <CardBody>
                    {workouts.map((workout) => (
                        <div key={workout.workoutId} className="mb-3 border-bottom pb-2">
                            <strong>{workout.type}</strong> - {new Date(workout.startTime).toLocaleString()} <br />
                            Reps: {workout.reps || "N/A"}
                        </div>
                    ))}
                </CardBody>
            </Card>
        )}
    </Container>
);

export default WorkoutToday;

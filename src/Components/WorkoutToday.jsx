import React from "react";
import { Card, CardBody, Container } from "reactstrap";

const WorkoutToday = ({ workouts }) => {
    const workoutTypeMap = {
        0: "Run",
        1: "Lift",
        2: "Squats",
        3: "Pushups",
    };

    return (
        <Container>
            <h3>Today's Workouts</h3>
            {workouts.length === 0 ? (
                <p>No workouts for today</p>
            ) : (
                <Card className="mt-3">
                    <CardBody>
                        {workouts.map((workout) => (
                            <div key={workout.workoutId} className="mb-3 border-bottom pb-2">
                                <strong>{workoutTypeMap[workout.type]}</strong> -{" "}
                                {new Date(workout.startTime * 1000).toLocaleString()} <br />
                                Reps: {workout.reps || "N/A"}
                            </div>
                        ))}
                    </CardBody>
                </Card>
            )}
        </Container>
    );
};

export default WorkoutToday;

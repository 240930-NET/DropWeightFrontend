import React, { useState, useEffect } from "react";
import { 
    Container, 
    Row, 
    Col, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from "reactstrap";
import WorkoutList from "../Components/WorkoutList";
import WorkoutToday from "../Components/WorkoutToday";
import WorkoutForm from "../Components/WorkoutForm";
import { getAllWorkouts, createWorkout, deleteWorkout } from "../Api/Workout";
import { useContext } from "react";
import { UserContext } from "../Utils/UserContext";

function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [todayWorkouts, setTodayWorkouts] = useState([]);
    const [addWorkoutModal, setAddWorkoutModal] = useState(false);
    const [error, setError] = useState(null);
    const { authToken } = useContext(UserContext);

    const initialWorkoutFormData = {
        startTime: "", 
        endTime: "",
        type: "", 
        reps: 0 
    };

    const [workoutFormData, setWorkoutFormData] = useState(initialWorkoutFormData);

    const toggle = () => setAddWorkoutModal(!addWorkoutModal);

    const handleWorkoutChange = (e) => {
        setWorkoutFormData({
            ...workoutFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleWorkoutSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createWorkout(workoutFormData, authToken);
            if (result) {
                setWorkouts([result, ...workouts]);
                setTodayWorkouts(isTodayWorkout(result) ? [result, ...todayWorkouts] : todayWorkouts);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        }
        setWorkoutFormData(initialWorkoutFormData);
        toggle();
    };

    const handleDeleteWorkout = async (id) => {
        try {
            const success = await deleteWorkout(id, authToken);
            if (success) {
                const updatedWorkouts = workouts.filter(workout => workout.workoutId !== id);
                setWorkouts(updatedWorkouts);
                setTodayWorkouts(updatedWorkouts.filter(isTodayWorkout));
            }
        } catch (err) {
            console.error("Error deleting workout:", err);
        }
    };

    const isTodayWorkout = (workout) => {
        const today = new Date();
        const workoutDate = new Date(workout.startTime);
        return (
            workoutDate.getDate() === today.getDate() &&
            workoutDate.getMonth() === today.getMonth() &&
            workoutDate.getFullYear() === today.getFullYear()
        );
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await getAllWorkouts(authToken);
                setWorkouts(data);
                setTodayWorkouts(data.filter(isTodayWorkout));
            } catch (err) {
                setError(err.message);
            }
        };
        fetchWorkouts();
    }, [authToken]);

    return (
        <Container style={{ marginTop: "20px" }}>
            <Row>
                <Col md={8}>
                    <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
                </Col>
                <Col md={4} className="d-flex flex-column align-items-center">
                    <WorkoutToday workouts={todayWorkouts} />
                    <Button color="primary" className="mt-2" onClick={toggle}>
                        Add Workout
                    </Button>
                </Col>
            </Row>
            <Modal isOpen={addWorkoutModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add a Workout</ModalHeader>
                <ModalBody>
                    <WorkoutForm
                        formData={workoutFormData}
                        handleChange={handleWorkoutChange}
                        handleSubmit={handleWorkoutSubmit}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default Workout;

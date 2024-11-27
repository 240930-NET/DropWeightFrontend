import React, { useState } from "react";
import { ListGroup, ListGroupItem, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { addGeoSpatial } from "../Api/Geospatial";


const WorkoutList = ({ workouts, onDelete, authToken, setWorkouts }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [geoSpatialData, setGeoSpatialData] = useState({ latitude: "", longitude: "" });
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

    const workoutTypeMap = {
        0: "Run",
        1: "Lift",
        2: "Squats",
        3: "Pushups",
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleGeoSpatialChange = (e) => {
        const { name, value } = e.target;
        setGeoSpatialData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGeoSpatialSubmit = async () => {
        if (selectedWorkoutId) {
            try {
                const geoSpatialDto = {
                    workoutId: selectedWorkoutId,
                    latitude: parseFloat(geoSpatialData.latitude),
                    longitude: parseFloat(geoSpatialData.longitude),
                };
                await addGeoSpatial(geoSpatialDto, authToken);

                setWorkouts((prevWorkouts) =>
                    prevWorkouts.map((workout) =>
                        workout.workoutId === selectedWorkoutId
                            ? {
                                  ...workout,
                                  geoSpatials: [
                                      ...(workout.geoSpatials || []),
                                      geoSpatialDto,
                                  ],
                              }
                            : workout
                    )
                );

                setGeoSpatialData({ latitude: "", longitude: "" });
                toggleModal();
            } catch (error) {
                console.error("Error adding geospatial data:", error);
            }
        }
    };

    return (
        <Container>
            <h3>All Workouts</h3>
            <ListGroup>
                {workouts.map((workout) => (
                    <ListGroupItem
                        key={workout.workoutId}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>{workoutTypeMap[workout.type]}</strong> -{" "}
                            {new Date(workout.startTime * 1000).toLocaleString()} <br />
                            Reps: {workout.reps || "N/A"}

                            {workout.type === 0 && workout.geoSpatials?.length > 0 && (
                                <div style={{ marginTop: "10px" }}>
                                    <strong>Geospatial Data:</strong>
                                    <ul style={{ paddingLeft: "20px" }}>
                                        {workout.geoSpatials.map((geo, index) => (
                                            <li key={index}>
                                                Latitude: {geo.latitude}, Longitude: {geo.longitude}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            {workout.type === 0 && (
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{ cursor: "pointer", marginRight: "10px", color: "blue" }}
                                    onClick={() => {
                                        setSelectedWorkoutId(workout.workoutId);
                                        toggleModal();
                                    }}
                                />
                            )}
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ cursor: "pointer", color: "gray" }}
                                onClick={() => onDelete(workout.workoutId)}
                            />
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add Geospatial Data</ModalHeader>
                <ModalBody>
                    <Input
                        type="number"
                        name="latitude"
                        placeholder="Latitude"
                        value={geoSpatialData.latitude}
                        onChange={handleGeoSpatialChange}
                        className="mb-2"
                    />
                    <Input
                        type="number"
                        name="longitude"
                        placeholder="Longitude"
                        value={geoSpatialData.longitude}
                        onChange={handleGeoSpatialChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleGeoSpatialSubmit}>
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default WorkoutList;

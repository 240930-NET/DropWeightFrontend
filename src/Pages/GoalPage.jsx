import React, { useState, useEffect } from 'react';
import '../Styles/GoalPage.css';
import { UserContext } from "../Utils/UserContext";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Trash2 } from 'lucide-react';

function GoalPage() {
    const [goals, setGoals] = useState([]);
    const [inProgressGoals, setInProgressGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const { authToken, currentUser } = React.useContext(UserContext);
    const [goalToEdit, setGoalToEdit] = useState(null);
    const [newGoal, setNewGoal] = useState({
        Type: 0,
        GoalName: "",
        IsAchieved: false,
        Description: "",
        StartingValue: 0,
        TargetValue: 0,
        CurrentValue: 0,
        UserId: currentUser.userId
    });

    const goalTypeMapping = {
        0: "Weight",
        1: "Strength",
        2: "Mile Time",
    };

    const toggleModal = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);

    const fetchGoals = async () => {
        try {
            const response = await fetch("http://localhost:5276/api/Goal", {
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setGoals(data);
        } catch(error) {
            console.error("Error fetching goals:", error);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5276/api/Goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(newGoal),
            });
            if (response.ok) {
                toggleModal();
                setNewGoal({
                    Type: 0,
                    GoalName: "",
                    IsAchieved: false,
                    Description: "",
                    StartingValue: 0,
                    TargetValue: 0,
                    CurrentValue: 0,
                    UserId: currentUser.userId,
                });
                await fetchGoals();
            }
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    const handleEditGoal = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5276/api/Goal/${goalToEdit.goalId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(goalToEdit),
            });
            if (response.ok) {
                toggleEditModal();
                await fetchGoals();
            }
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            const response = await fetch(`http://localhost:5276/api/Goal/${goalId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                await fetchGoals();
            }
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };

    const openEditModal = (goal) => {
        setGoalToEdit(goal);
        setEditModal(true);
    };

    useEffect(() => {
        if (authToken) {
            fetchGoals();
        }
    }, [authToken]);

    useEffect(() => {
        const inProgress = goals.filter(goal => !goal.isAchieved);
        const completed = goals.filter(goal => goal.isAchieved);
        setInProgressGoals(inProgress);
        setCompletedGoals(completed);
    }, [goals]);

    return (
        <div className="kanban-board">
            <h1 className="goals-title">Track Your Goals</h1>
            <Button className="add-goal-button" onClick={toggleModal}>
                Add Goal
            </Button>

            <div className="kanban-board-columns">
                <div className="kanban-column-progress">
                    <h2>Goals In Progress</h2>
                    {inProgressGoals.map(goal => (
                        <div key={goal.goalId} className="goal-card">
                            <h3>{goal.goalName || goalTypeMapping[goal.type]}</h3>
                            <p>{goal.description}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{ width: `${goal.progress}%` }}></div>
                                <div className="progress-info">
                                    <span className="start-value">{goal.startingValue}</span>
                                    <span className="current-value" style={{ left: `${goal.progress}%` }}>{goal.currentValue}</span>
                                    <span className="target-value">{goal.targetValue}</span>
                                </div>
                            </div>
                            <div className="button-group">
                                <button className="edit-button" onClick={() => openEditModal(goal)}>
                                    Edit
                                </button>
                                <Trash2 
                                    className="delete-icon" 
                                    size={25} 
                                    onClick={() => handleDeleteGoal(goal.goalId)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="kanban-column-complete">
                    <h2>Completed Goals</h2>
                    {completedGoals.map(goal => (
                        <div key={goal.goalId} className="goal-card">
                            <h3>{goal.goalName || goalTypeMapping[goal.type]}</h3>
                            <p>{goal.description}</p>
                            <div className="progress-container">
                                <div className="progress-bar" style={{ width: `${goal.progress}%` }}></div>
                                <div className="progress-info">
                                    <span className="start-value">{goal.startingValue}</span>
                                    <span className="current-value" style={{ left: `${goal.progress}%` }}>{goal.currentValue}</span>
                                    <span className="target-value">{goal.targetValue}</span>
                                </div>
                            </div>
                            <div className="button-group">
                                <button className="edit-button" onClick={() => openEditModal(goal)}>
                                    Update Goal
                                </button>
                                <Trash2 
                                    className="delete-icon" 
                                    size={24} 
                                    onClick={() => handleDeleteGoal(goal.goalId)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Goal Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} className="modal-header">
                    <h3 className="modal-title">Add New Goal</h3>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAddGoal}>
                        <FormGroup>
                            <Label for="goalType">Goal Type</Label>
                            <Input
                                type="select"
                                name="Type"
                                id="goalType"
                                value={newGoal.Type}
                                onChange={(e) => setNewGoal({ ...newGoal, Type: parseInt(e.target.value) })}
                            >
                                <option value={0}>Weight</option>
                                <option value={1}>Strength</option>
                                <option value={2}>Mile Time</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="goalName">Goal Name</Label>
                            <Input
                                type="text"
                                name="GoalName"
                                id="goalName"
                                value={newGoal.GoalName}
                                onChange={(e) => setNewGoal({ ...newGoal, GoalName: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                name="Description"
                                id="description"
                                value={newGoal.Description}
                                onChange={(e) => setNewGoal({ ...newGoal, Description: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startingValue">Starting Value</Label>
                            <Input
                                type="number"
                                name="StartingValue"
                                id="startingValue"
                                value={newGoal.StartingValue}
                                onChange={(e) => setNewGoal({ ...newGoal, StartingValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="targetValue">Target Value</Label>
                            <Input
                                type="number"
                                name="TargetValue"
                                id="targetValue"
                                value={newGoal.TargetValue}
                                onChange={(e) => setNewGoal({ ...newGoal, TargetValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="currentValue">Current Value</Label>
                            <Input
                                type="number"
                                name="CurrentValue"
                                id="currentValue"
                                value={newGoal.CurrentValue}
                                onChange={(e) => setNewGoal({ ...newGoal, CurrentValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <Button 
                            type="submit" 
                            style={{
                                backgroundColor: '#2193b0',
                                border: 'none',
                                width: '100%',
                                padding: '10px',
                                marginTop: '20px'
                            }}
                        >
                            Add Goal
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Edit Goal Modal */}
            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal} className="modal-header">
                    <h3 className="modal-title">Edit Goal</h3>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditGoal}>
                        <FormGroup>
                            <Label for="editGoalType">Goal Type</Label>
                            <Input
                                type="select"
                                name="type"
                                id="editGoalType"
                                value={goalToEdit?.type || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, type: parseInt(e.target.value) })}
                            >
                                <option value={0}>Weight</option>
                                <option value={1}>Strength</option>
                                <option value={2}>Mile Time</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="editGoalName">Goal Name</Label>
                            <Input
                                type="text"
                                name="goalName"
                                id="editGoalName"
                                value={goalToEdit?.goalName || ""}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, goalName: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editDescription">Description</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="editDescription"
                                value={goalToEdit?.description || ""}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, description: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editStartingValue">Starting Value</Label>
                            <Input
                                type="number"
                                name="startingValue"
                                id="editStartingValue"
                                value={goalToEdit?.startingValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, startingValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editTargetValue">Target Value</Label>
                            <Input
                                type="number"
                                name="targetValue"
                                id="editTargetValue"
                                value={goalToEdit?.targetValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, targetValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="editCurrentValue">Current Value</Label>
                            <Input
                                type="number"
                                name="currentValue"
                                id="editCurrentValue"
                                value={goalToEdit?.currentValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, currentValue: parseFloat(e.target.value) })}
                            />
                        </FormGroup>
                        <Button 
                            type="submit" 
                            style={{
                                backgroundColor: '#2193b0',
                                border: 'none',
                                width: '100%',
                                padding: '10px',
                                marginTop: '20px'
                            }}
                        >
                            Update Goal
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default GoalPage;
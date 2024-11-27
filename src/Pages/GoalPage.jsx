import React, { useState, useEffect } from 'react';
import '../Styles/GoalPage.css';
import { UserContext } from "../Utils/UserContext";

function GoalPage() {
    const [goals, setGoals] = useState([]);
    const[inProgressGoals, setInProgressGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken, currentUser} = React.useContext(UserContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For opening the edit modal
    const [goalToEdit, setGoalToEdit] = useState(null); // Holds the goal being edited
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
   //     3: "Custom"
    };

    const fetchGoals = async () => {
        try {
            const response = await fetch("http://localhost:5276/api/Goal");
            const data = await response.json();
            setGoals(data);
        }
        catch(error) {
            console.log(error);
        }
    };    


    const addGoal = async () => {
        try {
            console.log(newGoal);
            const response = await fetch("http://localhost:5276/api/Goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Added
                },
                body: JSON.stringify(newGoal),
            });
            if (response.ok) {
                setIsModalOpen(false);
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
                fetchGoals(); // Refresh goals
            } else {
                const error = await response.text();
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const updateGoal = async () => {
        try {
            const response = await fetch(`http://localhost:5276/api/Goal/${goalToEdit.goalId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Added
                },
                body: JSON.stringify(goalToEdit),
            });
    
            if (response.ok) {
                setIsEditModalOpen(false); // Close the modal
                fetchGoals(); // Refresh the list of goals
            } else {
                const error = await response.text();
                console.error("Error updating goal:", error);
            }
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };


    const openEditModal = (goal) => {
        setGoalToEdit({ ...goal }); // Prefill with the selected goal's data
        setIsEditModalOpen(true);
    };


    const deleteGoal = async (goalId) => {
        try {
            const response = await fetch(`http://localhost:5276/api/Goal/${goalId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`, // Added
                },
            });
    
            if (response.ok) {
                // Remove the deleted goal from the local state
                setGoals(goals.filter(goal => goal.goalId !== goalId));
            } else {
                const error = await response.text();
                console.error("Error deleting goal:", error);
            }
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };    


    useEffect(() => {
        fetchGoals();
    }, []);


    useEffect(() => {
        console.log("Goals before filtering:", goals); // Log all goals before filtering

        const inProgress = goals.filter(goal => goal.isAchieved === false);
        const completed = goals.filter(goal => goal.isAchieved === true);

        console.log("Filtered in-progress goals:", inProgress); // Debug filtered goals

        setInProgressGoals(inProgress);
        setCompletedGoals(completed);

        console.log("in progress goals: " + inProgressGoals);
    }, [goals]);

    console.log("Goal structure in inProgressGoals:", inProgressGoals.map(goal => ({
        GoalId: goal.goalId,
        GoalName: goal.goalName,
        Description: goal.description,
        Progress: goal.progress,
        StartingValue: goal.startingValue,
        CurrentValue: goal.currentValue,
        TargetValue: goal.targetValue
    })));
    

    return (
        <div className = "kanban-board">


            {/* Add Goal Button */}
            <button className="add-goal-button" onClick={() => setIsModalOpen(true) }>Add Goal</button>

            {/* Modal for Adding Goal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add a New Goal</h3>
                        <label>
                            Goal Type:
                            <select
                                value={newGoal.Type}
                                onChange={(e) => setNewGoal({ ...newGoal, Type: parseInt(e.target.value, 10) })}
                            >
                                <option value="0"> Weight </option>
                                <option value="1"> Strength </option>
                                <option value="2"> Mile Time </option>
                           {/*     <option value="3"> Custom </option>  */}
                            </select>
                        </label>
                        <label>
                            Goal Name:
                            <input
                                type="text"
                                value={newGoal.GoalName}
                                onChange={(e) => setNewGoal({ ...newGoal, GoalName: e.target.value })}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={newGoal.Description}
                                onChange={(e) => setNewGoal({ ...newGoal, Description: e.target.value })}
                            />
                        </label>
                        <label>
                            Starting Value:
                            <input
                                type="number"
                                value={newGoal.StartingValue}
                                onChange={(e) => setNewGoal({ ...newGoal, StartingValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>
                            Target Value:
                            <input
                                type="number"
                                value={newGoal.TargetValue}
                                onChange={(e) => setNewGoal({ ...newGoal, TargetValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>
                            Current Value:
                            <input
                                type="number"
                                value={newGoal.CurrentValue}
                                onChange={(e) => setNewGoal({ ...newGoal, CurrentValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <button onClick={addGoal}>Add Goal</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}


            {/* Modal for updating a goal*/}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Goal</h3>
                        <label>
                            Goal Type:
                            <select
                                value={goalToEdit?.type}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, type: parseInt(e.target.value, 10) })}
                            >
                                <option value="0">Weight</option>
                                <option value="1">Strength</option>
                                <option value="2">Mile Time</option>
                             {/*   <option value="3">Custom</option>  */}
                            </select>
                        </label>
                        <label>
                            Goal Name:
                            <input
                                type="text"
                                value={goalToEdit?.goalName || ""}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, goalName: e.target.value })}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={goalToEdit?.description || ""}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, description: e.target.value })}
                            />
                        </label>
                        <label>
                            Starting Value:
                            <input
                                type="number"
                                value={goalToEdit?.startingValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, startingValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>
                            Target Value:
                            <input
                                type="number"
                                value={goalToEdit?.targetValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, targetValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>
                            Current Value:
                            <input
                                type="number"
                                value={goalToEdit?.currentValue || 0}
                                onChange={(e) => setGoalToEdit({ ...goalToEdit, currentValue: parseFloat(e.target.value) })}
                            />
                        </label>
                        <button onClick={updateGoal}>Update Goal</button>
                        <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}


            <div className = "kanban-board-columns">

                <div className = "kanban-column-progress">
                    <h2> Goals In Progress </h2>
                    {inProgressGoals.length > 0 ? (
                        inProgressGoals.map(goal => (
                            <div key={goal.goalId} className="goal-card">
                                <h3> {goal.goalName ? goal.goalName : goalTypeMapping[goal.type]} </h3>
                                <p> {goal.description} </p>

                                <div className="progress-container">
                                    <div className="progress-bar" style={{
                                        width: `${goal.progress}%`
                                    }}>
                                    </div>

                                    <div className="progress-info">
                                        <span className="start-value">{goal.startingValue}</span>
                                        <span className="current-value" style={{ left: `${goal.progress}%` }}> {goal.currentValue}</span>
                                        <span className="target-value">{goal.targetValue}</span>
                                    </div>
                                </div>
                                
                                {/* Edit Button */}
                                <button className="edit-button" onClick={() => openEditModal(goal)}>Edit</button>

                                {/* Delete Button */}
                                <button className="delete-button" onClick={() => deleteGoal(goal.goalId)}>Delete</button>

                            </div>
                        ))
                    ) : (
                        <p> No goals in progress </p>
                    )}
                    
                    
                </div>

                <div className = "kanban-column-complete">
                    <h2> Completed Goals </h2>
                    {completedGoals.length > 0 ? (
                        completedGoals.map(goal => (
                            <div key={goal.goalId} className="goal-card"> 
                                <h3> {goal.goalName ? goal.goalName : goalTypeMapping[goal.type]} </h3>
                                <p> {goal.description} </p>

                                <div className = "progress-container">
                                    <div className = "progress-bar" style={{width: `${goal.progress}%`}}> </div>
                                    <div className = "progress-info">
                                        <span className="start-value"> {goal.startingValue} </span>
                                        <span className="current-value" style={{ left: `${goal.progress}%` }}> {goal.currentValue} </span>
                                        <span className="target-value"> {goal.targetValue} </span>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button className="edit-button" onClick={() => openEditModal(goal)}>Edit</button>

                                {/* Delete Button */}
                                <button className="delete-button" onClick={() => deleteGoal(goal.goalId)}>Delete</button>
                            
                            </div>
                        ))
                    ) : (
                        <p> No completed goals </p>
                    )}
                </div>
                    
            </div>

        </div>
    )


}

export default GoalPage;
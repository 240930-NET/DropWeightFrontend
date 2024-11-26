import React, { useState, useEffect } from 'react';
import '../Styles/GoalPage.css';

function GoalPage() {
    const [goals, setGoals] = useState([]);
    const[inProgressGoals, setInProgressGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authToken, currentUser: user } = React.useContext(UserContext);
    const [newGoal, setNewGoal] = useState({
        Type: 0, 
        GoalName: "",
        IsAchieved: false,
        Description: "",
        StartingValue: 0,
        TargetValue: 0,
        CurrentValue: 0,
        UserId: user.userId
    });


    // const fetchGoals = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5276/api/Goal");
    //         const data = await response.json();
    //         setGoals(data);
    //     }
    //     catch(error) {
    //         console.log(error);
    //     }
    // };

    

    const fetchGoals = async () => {
        try {
            const response = await fetch("http://localhost:5276/api/Goal");
            const data = await response.json();
            console.log("Fetched goals:", data); // Check the data structure
            setGoals(data); // Ensure this updates the state
        } catch (error) {
            console.log(error);
        }
    };


    const addGoal = async () => {
        try {
            console.log(newGoal);
            const response = await fetch("http://localhost:5276/api/Goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGoal)
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
                    UserId: user.userId
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


    // const deleteGoal = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (token) {
    //             setAuthToken(token);
    //         }
    //         const response = await apiClient.delete('/user/DeleteUser');
    //         setUserId(response.data.userId);
    //         alert("Account successfully deleted");
    //     }
    //     catch (error) {
    //         console.error("Error deleting account:", error.response?.data || error.message)
    //         alert("There was a problem deleting your account. Please try again");
    //     }
    // };


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
            <button onClick={() => setIsModalOpen(true) }>Add Goal</button>

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
                                <option value="3"> Custom </option>
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







            <div className = "kanban-column-progress">
                <h2> Goals In Progress </h2>
                {inProgressGoals.length > 0 ? (
                    inProgressGoals.map(goal => (
                        <div key={goal.goalId} className="goal-card">
                            <h3> {goal.goalName ? goal.goalName : goal.type} </h3>
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
                        <div key={goal.GoalId} className="goal-card"> 
                            <h3> {goal.GoalName ? goal.GoalName : goal.Type} </h3>
                            <p> {goal.Description} </p>

                            <div className = "progress-container">
                                <div className = "progress-bar" style={{width: `${goal.Progress}%`}}> </div>
                                <div className = "progress-info">
                                    <span className="start-value"> {goal.StartingValue} </span>
                                    <span className="current-value" style={{ left: `${goal.Progress}%` }}> {goal.CurrentValue} </span>
                                    <span className="target-value"> {goal.TargetValue} </span>
                                </div>
                            </div>
                        
                        </div>
                    ))
                ) : (
                    <p> No completed goals </p>
                )}
            </div>
                
        </div>
    )


}

export default GoalPage;
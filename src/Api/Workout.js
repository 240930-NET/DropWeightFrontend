
import { UserContext } from '../Utils/UserContext';
import { useContext } from 'react';

const url = 'http://localhost:5276/api/workout/';

const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});

export const getAllWorkouts = async (token) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch workouts");
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return [];
    }
};

export const getWorkoutById = async (id, token) => {
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch workout");
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error(`Error fetching workout with ID ${id}:`, error);
        return null;
    }
};

export const getWorkoutsByType = async (type, token) => {
    try {
        const response = await fetch(`${url}type/${type}`, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch workouts by type");
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error(`Error fetching workouts by type ${type}:`, error);
        return [];
    }
};

export const createWorkout = async (workout, token) => {
    try {
        console.log("token: ", token)
        console.log({
            method: 'POST',
            headers: getCommonHeader(token).headers,
            body: JSON.stringify(workout),
        });
        
        const response = await fetch(url, {
            method: 'POST',
            ...getCommonHeader(token),
            body: JSON.stringify(workout),
        });
        console.log(response)
        if (!response.ok) throw new Error("Failed to create workout");
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error("Error creating workout:", error);
        return null;
    }
};

export const updateWorkout = async (workout, token) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            ...getCommonHeader(token),
            body: JSON.stringify(workout),
        });
        if (!response.ok) throw new Error("Failed to update workout");
        return true;
    } catch (error) {
        console.error("Error updating workout:", error);
        return false;
    }
};

export const deleteWorkout = async (id, token) => {
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'DELETE',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to delete workout");
        return true;
    } catch (error) {
        console.error(`Error deleting workout with ID ${id}:`, error);
        return false;
    }
};

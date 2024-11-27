import { useEffect, useState, useContext } from "react";
import { UserContext } from '../Utils/UserContext';

const url = 'http://localhost:5276/api/auth/';
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});



export const registerAPI = async (username, password, firstName, lastName) => {
    try{
        const response = await fetch(`${url}register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, firstName, lastName})
        });
        const data = await response.json();
        console.log("data")
        console.log(data)
        return data || null;
    } catch (e) {
        console.error("Failed to register user")
        console.log(e)
        return null;
    }
}

export const loginAPI = async (username, password) => {
    try {
        const response = await fetch(`${url}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        return data?.token || null;
    } catch {
        console.error("Error fetching token");
        return null;
    }
};

import { useEffect, useState, useContext } from "react";
import { UserContext } from '../Utils/UserContext';

const url = 'https://dropweightbackend.azurewebsites.net/api/users/';
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});

export const getUserAPI = async (username, token) => {
    try {
        const response = await fetch(`${url}username/${username}`, getCommonHeader(token));
        const data = await response.json();
        console.log(data)
        return data || null;
    } catch {
        console.error('Error fetching user');
        return null;
    }
}
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../Utils/UserContext';

const url = 'http://localhost:5276/api/Auth/';
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});


export const useRegister = (username, password, firstName, lastName) =>{
    const [user, setUser] = useState({})
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchRegister = async () => {
            try{
                const response = await fetch(`${url}register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, firstName, lastName})
                });
                const data = await response.json();
                setUser(data || {})
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Failed to register user")
            }
        }
        if (authToken && username && password && firstName && lastName) fetchRegister();
    }, [authToken, username, password, firstName, lastName])
    return user;
}


export const useLogin = (username, password) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${url}login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                setToken(data?.token || '')
            } catch (error) {
                console.error("Error fetching Token: ", error.message)
            }
        }
        if (username && password) fetchToken();
    }, [username, password]);
    return token;
}

/*export const getUserAPI = async (username, token) => {
    try {
        const response = await fetch(`${url}username/${username}`, getCommonHeader(token));
        const data = await response.json();
        return data || null;
    } catch {
        console.error('Error fetching user');
        return null;
    }
}*/

export const registerAPI = async (username, password, firstName, lastName) => {
    try{
        const response = await fetch(`${url}register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, firstName, lastName})
        });
        const data = await response.json();
        return data || null;
    } catch {
        console.error("Failed to register user")
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
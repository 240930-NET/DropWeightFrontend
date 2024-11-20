import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { UserContext, UserProvider } from './Utils/UserContext';

function App() {
    const { user } = useContext(UserContext);

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
                path="/*"
                element={user ? <BlankPage /> : <Navigate to="/login" replace />}
            />
        </Routes>
    );
}

function BlankPage() {
    return (
        <div>
            <h1>Welcome to DropWeight</h1>
            <p>This is the blank page. Content will be added here later.</p>
        </div>
    );
}

// Wrap the Router around the App
export default function AppWrapper() {
    return (
        <Router>
            <UserProvider>
                <App />
            </UserProvider>
        </Router>
    );
}


import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import { UserContext, UserProvider } from './Utils/UserContext';

function App() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            <Routes>
                {user ? (
                    <Route path="/*" element={<BlankPage />} />
                ) : (
                    <Route path="/*" element={<Navigate to="/login" replace />} />
                )}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
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

export default function AppWrapper() {
    return (
        <UserProvider>
            <App />
        </UserProvider>
    );
}

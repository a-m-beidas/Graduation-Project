import React, { useState, useEffect } from 'react';
import jwt from '../utils/JWTPayload';
// import { Dashboard } from './components/Dashboard.js'
import { Dashboard } from '../components/Dashboard'

const DashboardPath = () => {
    const [username, setUsername] = useState(", sign in");
    useEffect(() => {
        const clientName = jwt("sub");
        if (!clientName)
            return;
        setUsername(clientName);
    });
    return (
        <div >
            <h1 style={{ margin: "20px 50px", }}>
                Welcome {username}!
            </h1>
            <Dashboard />
        </div>
    );
}

export default DashboardPath
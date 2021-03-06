import React, { useState, useEffect } from 'react';
import jwt from '../utils/JWTPayload';

const Dashboard = () => {
    const[username, setUsername] = useState(", sign in");
    useEffect(() => {
        const clientName = jwt("sub");
        if (!clientName)
            return;
        setUsername(clientName);
    });
    return (
    <div>   
        <h1>
            Welcome {username}!
        </h1>
        <br/>
        <h2>Dashboard here</h2>
    </div> 
    );
}

export default Dashboard
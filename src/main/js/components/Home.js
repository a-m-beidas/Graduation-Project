import React, { useState, useEffect } from 'react';

const Home = () => {
    const[username, setUsername] = useState(", sign in");
    useEffect(() => {
        var user = localStorage.getItem("user");
        if (!user)
            return;
        user = JSON.parse(user);
        setUsername(user.sub);
    });
    return (<h1>Welcome {username}</h1>);
}

export default Home
"use client"

import { useEffect, useState } from "react";

import { host } from "../host";

export default function UsersPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  /* useEffect(() => {
    fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'Användarnamn',
       // password: 'Lösenord',
    }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

  }, []) */

  const handlePostUser = () => {
    fetch(`${host}/users`, { // users sidan på backend! dvs inte riktiga sidan!
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username, // "backend får in detta som en "request" i "body"... se server.js när vi skriver t.ex. const data = req.body "
          password: password,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

    
  };
  


  return (
    <div>
      <h1>User Page</h1>

      <h3>Create User:</h3>
      <div className="flex flex-col items-start">
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={username} onChange={(e) => {
          setUsername(e.target.value);
        }} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="text" value={password} onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </div>
      
      <button onClick={handlePostUser}>Create User</button>
{/*       <input type="text" /> */}
    </div>
  )

}
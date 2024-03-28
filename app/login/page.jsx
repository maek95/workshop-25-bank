"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { host } from "../host";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handlePostSession() {
    async function postSession() {
      try {
        //const response = await fetch("http://localhost:4000/sessions", {
        const response = await fetch(`${host}/sessions`, {
          // users sidan på backend! dvs inte riktiga sidan!
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username, // "backend får in detta som en "request" i "body"... se server.js när vi skriver t.ex. const data = req.body "
            password: password,
          }),
        });

        const data = await response.json();    
          if (data.token) {
            localStorage.setItem("token", data.token);
            //localStorage.setItem("userId", data.userId);
           
            console.log(localStorage);
            router.push("/account");
          } else {
            console.log("token could not be fetched to login-page");
          }       
      } catch (error) {
        console.error('Error:', error)
      }
    }

    postSession();
  }

  // behöver inte hämta data ifrån user-sidan, användare som har skapats är lagrat på backend!
  return (
    <div>
      <h1>Login Page</h1>

      <h3>H</h3>
      <div className="flex flex-col items-start">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button onClick={handlePostSession}>Login</button>
      {/*       <input type="text" /> */}
    </div>
  );
}

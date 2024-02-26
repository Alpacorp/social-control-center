"use client";

import { useState } from "react";

export const SignUpSection = () => {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("info received", info);

    if (info.username === "" || info.email === "" || info.password === "") {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/signup/", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        setLoading(false);
        const form = event.target as HTMLFormElement;
        form.reset();
        console.log("User created");
        setMessage(data.message);
      } else {
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("POST /api/auth/signup failed:", error);
      setLoading(false);
      setMessage("Internal server error");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(event) => handleInput(event)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(event) => handleInput(event)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => handleInput(event)}
          />
        </div>
        {/* if loading is true show loading, if message is true show message in the same line*/}
        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

"use client";

import { useSignUp } from "./hooks/useSignUp";

export const SignUpSection = () => {
  const { message, loading, handleInput, handleSubmit } = useSignUp();

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
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
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
        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
        <button
          type="submit"
          disabled={loading || message === "User created" ? true : false}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
};

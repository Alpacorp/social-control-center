"use client";

import { useLogin } from "./hooks/useLogin";

export const LoginSection = () => {
  const { message, loading, handleInput, handleSubmit } = useLogin();

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}
        <button
          type="submit"
          disabled={loading || message === "User created" ? true : false}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
    </section>
  );
};

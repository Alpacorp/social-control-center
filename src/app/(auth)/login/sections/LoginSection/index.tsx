"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "./hooks/useLogin";

export const LoginSection = () => {
  const { message, loading, handleInput, handleSubmit } = useLogin();
  const { push } = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response logout", response);

    if (response.ok) {
      console.log("Logout successful");
      sessionStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      push("/");
    } else if (response.status === 404) {
      console.log("No token");
      push("/");
    }
  };

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
        <button
          onClick={() => {
            fetch("/api/test/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
          }}
        >
          Test
        </button>
      </form>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </button>
    </section>
  );
};

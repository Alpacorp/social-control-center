import { signIn } from "next-auth/react";
import { useState } from "react";

export const useLogin = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("info received", info);

    if (info.email === "" || info.password === "") {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: info.email,
        password: info.password,
      });

      if (res?.error) {
        console.error("Failed to sign in:", res?.error);
        setLoading(false);
        setMessage("Failed to sign in");
        return;
      }
    } catch (error) {
      console.error("POST /api/auth/signup failed:", error);
      setLoading(false);
      setMessage("Internal server error");
    }
  };

  return { info, message, loading, handleInput, handleSubmit };
};

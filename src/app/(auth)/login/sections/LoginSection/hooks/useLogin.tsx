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
      const response = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: info.email,
          password: info.password,
        }),
      });

      console.log("response login", response);

      if (response.ok) {
        const data = await response.json(); // Asegúrate de que la respuesta no esté vacía
        console.log("Login successful", data);
        setLoading(false);
        setMessage("Login successful");
        // Aquí puedes hacer algo con el token recibido, como almacenarlo localmente
        sessionStorage.setItem("token", data.token);
        // save token into cookie
        document.cookie = `token=${data.token}; path=/;`;
      } else {
        // Si la respuesta no es ok, aún intenta leer el cuerpo para mostrar el mensaje de error
        const errorData = await response.text(); // Usa text() en caso de que no haya un JSON válido
        try {
          const jsonError = JSON.parse(errorData); // Intenta analizar el texto a JSON
          setMessage(jsonError.message || "Failed to log in");
        } catch {
          setMessage("Failed to log in"); // Maneja el caso de que el cuerpo no sea un JSON válido
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("POST /api/auth/route failed:", error);
      setLoading(false);
      setMessage("Internal server error");
    }
  };

  return { info, message, loading, handleInput, handleSubmit };
};

import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.NEXT_PUBLIC_JWT_SECRET ?? "tu_clave_secreta_aqui";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1d", // El token expira en 1 día
  });
};

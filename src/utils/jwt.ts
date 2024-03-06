import jwt from "jsonwebtoken";

const generateJWT = (uid, name, role, area) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, role, area };
    jwt.sign(
      payload,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Could not generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;

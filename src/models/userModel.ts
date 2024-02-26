import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already taken"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;

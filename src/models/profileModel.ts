import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    profilename: {
      type: String,
      required: [true, "Profilename is required"],
    },
    profilelastname: {
      type: String,
      required: [true, "Profilelastname is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
    },
    birthdate: {
      type: Date,
      required: [true, "Birthdate is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile ||
  mongoose.model("Profile", profileSchema, "profiles");

export default Profile;

import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "Number is required"],
      unique: [true, "Number is already taken"],
    },
    operator: {
      type: String,
      required: [true, "Operator is required"],
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Phone =
  mongoose.models.Phone || mongoose.model("Phone", phoneSchema, "phones");

export default Phone;

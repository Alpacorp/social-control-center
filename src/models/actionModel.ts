import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    idprofile: {
      type: String,
      required: [true, "Idprofile is required"],
    },
    socialmedia: {
      type: String,
      required: [true, "Socialmedia is required"],
    },
    urlmention: {
      type: String,
      required: [true, "Urlmention is required"],
    },
    customer: {
      type: String,
      required: [true, "Customer is required"],
    },
    typeaction: {
      type: String,
      required: [true, "Typeaction is required"],
    },
  },
  { timestamps: true }
);

const Action =
  mongoose.models.Action || mongoose.model("Action", actionSchema, "actions");

export default Action;

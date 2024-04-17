import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    idprofile: {
      type: String,
      required: [true, "Idprofile is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    typeaccount: {
      type: String,
      required: [true, "Typeaccount is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    passaccount: {
      type: String,
      required: [true, "Passaccount is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    comments: {
      type: String,
      required: [true, "Comments is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
    },
    revision: {
      type: String,
      required: [true, "Revision is required"],
    },
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account ||
  mongoose.model("Account", accountSchema, "accounts");

export default Account;

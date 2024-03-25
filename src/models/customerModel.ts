import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: [true, "Customer is required"],
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema, "customers");

export default Customer;

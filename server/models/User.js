import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["First name field required"] },
    lastName: { type: String, required: ["Last name field required"] },
    email: { type: String, required: ["Email field required"] },
    password: { type: String, required: ["password field required"] },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);
export default new mongoose.model("User", userSchema);

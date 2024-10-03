import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    address: {
      type: Object,
    },
    phone: {
      type: String,
      default: "0000000000",
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      default: "not provided",
    },
    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
    appointments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

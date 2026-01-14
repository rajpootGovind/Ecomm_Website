const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
      default: "public/profiles/default-avatar.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    pan: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

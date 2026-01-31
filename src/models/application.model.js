const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      unique: true,
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or Admin model if you have one
      default: null,
    },

    approved_limit: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);

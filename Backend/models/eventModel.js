import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    faculty: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        attended: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);

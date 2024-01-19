import express from "express";
import {
  createEventController,
  deleteEventController,
  getEventAttendees,
  getEventFaculty,
  getEventModerators,
  getEventVolunteers,
  getEventsController,
  getSingleEventController,
  markAttendanceController,
  updateEventController,
  onSpotRegistration,
} from "../controllers/eventController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-event", createEventController);

router.get("/get-events", getEventsController);

router.get("/faculty", getEventFaculty);

router.get("/attendees", getEventAttendees);

router.get("/moderators", getEventModerators);

router.get("/volunteers", getEventVolunteers);

router.get("/get-event/:id", getSingleEventController);

router.put("/update-event/:id", updateEventController);

router.delete("/delete-event/:id", deleteEventController);

router.post("/:id/mark-attendance", protect, markAttendanceController);

router.post("/onspot-register", protect, onSpotRegistration);

export default router;

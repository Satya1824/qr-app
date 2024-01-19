import eventModel from "../models/eventModel.js";
import userModel from "../models/userModel.js";

export const createEventController = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      attendees,
      faculty,
      moderators,
      volunteers,
    } = req.body;

    if (
      !title ||
      !description ||
      !startTime ||
      !endTime ||
      !attendees ||
      !faculty
    ) {
      return res.status(400).json({
        success: false,
        message: "Kindly fill all the mandatory fields!",
      });
    }

    const parsedModerators = moderators ? JSON.parse(moderators) : [];
    const parsedVolunteers = volunteers ? JSON.parse(volunteers) : [];
    const parsedAttendees = JSON.parse(attendees);

    const duplicateVol = parsedAttendees.some((attendee) =>
      parsedVolunteers.includes(attendee)
    );

    if (duplicateVol) {
      return res.status(201).json({
        success: false,
        message: "A attendee cannot be a volunteer in an event!",
      });
    }

    const duplicateMod = parsedAttendees.some((attendee) =>
      parsedModerators.includes(attendee)
    );

    if (duplicateMod) {
      return res.status(201).json({
        success: false,
        message: "A attendee cannot be a moderator in an event!",
      });
    }

    const event = new eventModel({
      title,
      description,
      startTime,
      endTime,
      faculty: JSON.parse(faculty),
      moderators: parsedModerators,
      volunteers: parsedVolunteers,
    });

    for (const attendeeId of parsedAttendees) {
      if (attendeeId) {
        event.attendees.push({
          user: attendeeId,
        });
      }
    }

    await event.save();

    return res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating event!",
      error: error.message,
    });
  }
};

export const getEventFaculty = async (req, res) => {
  try {
    const { allFacultyIds } = req.query;
    // console.log(allFacultyIds);

    const facultyData = await userModel
      .find({ _id: { $in: allFacultyIds } })
      .select("-password");

    // console.log(facultyData);

    res.status(200).send({
      success: true,
      message: "Faculty details fetched successfully!",
      facultyData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch faculty details!",
      error,
    });
  }
};

export const getEventModerators = async (req, res) => {
  try {
    const { allModeratorsIds } = req.query;

    const moderatorData = await userModel
      .find({ _id: { $in: allModeratorsIds } })
      .select("-password");

    res.status(200).send({
      success: true,
      message: "Moderator details fetched successfully!",
      moderatorData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch moderator details!",
      error,
    });
  }
};

export const getEventVolunteers = async (req, res) => {
  try {
    const { allVolunteersIds } = req.query;

    const volunteerData = await userModel
      .find({ _id: { $in: allVolunteersIds } })
      .select("-password");

    res.status(200).send({
      success: true,
      message: "Volunter details fetched successfully!",
      volunteerData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch volunteer details!",
      error,
    });
  }
};

export const getEventAttendees = async (req, res) => {
  try {
    const { allUserIds } = req.query;
    // console.log(allUserIds);

    const attendeesData = await userModel
      .find({ _id: { $in: allUserIds } })
      .select("-password");

    // console.log(attendeesData);

    res.status(200).send({
      success: true,
      message: "Attendees details fetched successfully!",
      attendeesData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch attendees' details!",
      error,
    });
  }
};

// get events
export const getEventsController = async (req, res) => {
  try {
    const events = await eventModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All events ",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting events!",
      error: error.message,
    });
  }
};

//delete event
export const deleteEventController = async (req, res) => {
  try {
    await eventModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting event!",
      error,
    });
  }
};

export const getSingleEventController = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(404).send({
        success: false,
        message: "No id is there!",
      });
    }
    // console.log(eventId);

    const eventData = await eventModel.findById(eventId);

    // console.log(eventData);

    res.status(200).send({
      success: true,
      message: "Event data fetched successfully!",
      eventData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching event data!",
    });
  }
};

export const updateEventController = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      faculty,
      moderators,
      volunteers,
    } = req.body;

    const updatedEvent = {
      title,
      description,
      startTime,
      endTime,
      faculty: JSON.parse(faculty),
      moderators: JSON.parse(moderators),
      volunteers: JSON.parse(volunteers),
      attendees: [],
    };

    const event = await eventModel.findByIdAndUpdate(
      req.params.id,
      updatedEvent,
      { new: true }
    );

    const attendees = JSON.parse(req.body.attendees);

    for (const attendeeId of attendees) {
      if (attendeeId) {
        event.attendees.push({
          user: attendeeId,
          // attended: attendee.attended || false,
        });
      }
    }

    const updatedEventWithAttendees = await event.save();

    if (!event) {
      return res.status(404).send({
        success: false,
        message: "Event not found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Event updated successfully!",
      event: updatedEventWithAttendees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating event!",
    });
  }
};

export const markAttendanceController = async (req, res) => {
  try {
    const eventId = req.params.id;
    // console.log(eventId);

    const studentId = req.body.studentId;
    // console.log(studentId);

    const marker = req.user;

    const event = await eventModel.findById(eventId);

    const isUserModerator = event.moderators.includes(req.user._id.toString());
    const isUserVolunteer = event.volunteers.includes(req.user._id.toString());

    if (
      marker.role !== "admin" &&
      marker.role !== "faculty" &&
      !isUserModerator &&
      !isUserVolunteer
    ) {
      return res.status(202).send({
        success: false,
        message: "You are unauthorized to perform this action!",
      });
    }

    if (!event) {
      return res.status(201).send({
        success: false,
        message: "Event not found!",
      });
    }

    const attendeeIndex = event.attendees.findIndex(
      (attendee) => attendee.user.toString() === studentId
    );

    if (attendeeIndex === -1) {
      return res.status(203).send({
        success: false,
        message: "Student not found in the attendees list for this event!",
      });
    }

    event.attendees[attendeeIndex].attended = true;

    await event.save();

    res.status(200).send({
      success: true,
      message: "Attendance marked!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error marking attendance!",
      error,
    });
  }
};

export const onSpotRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const onSpotUser = req.user;
    // console.log("eventId: " + eventId);
    // console.log("userId: " + userId);

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const isUserModerator = event.moderators.includes(req.user._id.toString());
    const isUserVolunteer = event.volunteers.includes(req.user._id.toString());

    if (isUserModerator && isUserVolunteer) {
      return res.status(201).send({
        success: false,
        message:
          "You are already registered in this event as a moderator/volunteer!",
      });
    }

    // const user = await userModel.findById(userId);
    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "User not found" });
    // }

    if (onSpotUser.role !== "student") {
      return res.status(201).send({
        success: false,
        message: "Only students can register!",
      });
    }

    const isRegistered = event.attendees.some(
      (attendee) => attendee.user.toString() === onSpotUser._id.toString()
    );
    if (isRegistered) {
      return res.status(400).json({
        success: false,
        message: "User is already registered for the event",
      });
    }

    event.attendees.push({ user: onSpotUser._id.toString() });
    await event.save();

    return res.status(200).json({
      success: true,
      message: "You have successfully registered for the event.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error registering user for the event!",
      error: error.message,
    });
  }
};

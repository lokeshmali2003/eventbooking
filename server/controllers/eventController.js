const Event = require("../models/EventModel");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      category,
      city,
      date,
      location,
      price,
      seats,
      description,
      img,
      tag,
    } = req.body;

    if (
      !name ||
      !category ||
      !city ||
      !date ||
      !location ||
      !price ||
      !seats ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const event = await Event.create({
      name,
      category,
      city,
      date,
      location,
      price,
      seats,
      description,
      img,
      tag,
    });

    res.status(201).json({
      success: true,
      message: "Event Created Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// event Delete
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
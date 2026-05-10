const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  deleteEvent, updateEvent,
} = require("../controllers/eventController");

router.post("/createEvent", createEvent);
router.get("/", getEvents);
router.delete("/deleteEvent/:id", deleteEvent);
router.put("/updateEvent/:id", updateEvent);

module.exports = router;
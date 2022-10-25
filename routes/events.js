/* 
    Rutas de Events
    host + /api/events/
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");
const router = Router();

// Use jwt validator
router.use(jwtValidator);

// Get events
router.get("/", getEvents);

// Create event
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

module.exports = router;

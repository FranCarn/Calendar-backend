/* 
    Rutas de Usuarios / auth
    host + /api/auth/
*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { fieldValidator } = require("../middlewares/fieldValidator");
const { newUser, loginUser, renewToken } = require("../controllers/auth");
const { jwtValidator } = require("../middlewares/jwtValidator");

// Routes

router.post(
  "/new",
  [
    // Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio o invalido").isEmail(),
    check(
      "password",
      "La contraseña debe de tener como mínimo 6 digitos"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  newUser
);

router.post(
  "/",
  [
    // Middlewares
    check("email", "El email es obligatorio o invalido").isEmail(),
    check(
      "password",
      "La contraseña debe de tener como mínimo 6 digitos"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", jwtValidator, renewToken);

module.exports = router;

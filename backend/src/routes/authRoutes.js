const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile
} = require("../controllers/authController");

const {
  protect
} = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
  registerSchema,
  loginSchema
} = require("../validations/authValidation");
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  validate(registerSchema),
  register
);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  validate(loginSchema),
  login
 );
router.get("/profile", protect, getProfile);

module.exports = router;
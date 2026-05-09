const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const {
  protect
} = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
  createTaskSchema
} = require("../validations/taskValidation");
/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  protect,
  validate(createTaskSchema),
  createTask
);
/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get logged-in user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;
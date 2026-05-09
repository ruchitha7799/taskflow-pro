const prisma = require("../config/prisma");


// CREATE TASK
const createTask = async (req, res) => {
  try {

    const { title, description, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: req.user.userId
      }
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET MY TASKS
const getTasks = async (req, res) => {
  try {

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// UPDATE TASK
const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    // Check task ownership
    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId: req.user.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: req.body
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    // Check ownership
    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId: req.user.userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
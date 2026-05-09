const express = require("express");

const router = express.Router();

const {
  protect
} = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  protect,
  authorizeRoles("ADMIN"),
  (req, res) => {

    res.json({
      success: true,
      message: "Welcome Admin"
    });

  }
);

module.exports = router;
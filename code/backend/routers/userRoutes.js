const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  getAllAnimalsController,
  adoptingController,
  sendAllRequestToUserController,
} = require("../controllers/userController");

const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController);

router.get("/getallanimals", getAllAnimalsController);

router.post("/adoptinganimal/:animalId", authMiddleware, adoptingController);

router.get("/allrequest", authMiddleware, sendAllRequestToUserController);

module.exports = router;

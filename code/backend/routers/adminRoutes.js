const express = require("express");
const multer = require("multer");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  postAnimalController,
  sendingAllRequestController,
  changeStatusController,
} = require("../controllers/adminController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postanimal",
  upload.array("photos"),
  authMiddleware,
  postAnimalController
);

router.get("/getallrequest", authMiddleware, sendingAllRequestController);

router.post("/changestatus/:requestId", authMiddleware, changeStatusController)

module.exports = router;

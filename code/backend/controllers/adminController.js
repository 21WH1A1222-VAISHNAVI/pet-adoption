const { adoptionSchema } = require("../schemas/adoptionModel");
const animalSchema = require("../schemas/animalModel");
const userSchema = require("../schemas/userModel");

///////posting animal
const postAnimalController = async (req, res) => {
  // console.log(req.files);
  try {
    let photos = [];
    if (req.files) {
      photos = req.files.map((photo) => ({
        fileName: photo.filename,
        path: `/uploads/${photo.filename}`,
      }));
    }

    const animal = new animalSchema({
      ...req.body,
      photos,
    });

    await animal.save();

    return res.status(201).json({
      success: true,
      message: "Added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//////all request to admin
const sendingAllRequestController = async (req, res) => {
  try {
    const allRequest = await adoptionSchema.find();

    const allUserIDs = allRequest.map((ids) => ids.userId);

    const allPetIDs = allRequest.map((ids) => ids.petId);

    const allUserNames = await userSchema.find({
      _id: { $in: allUserIDs },
    });

    const allPetNames = await animalSchema.find({
      _id: { $in: allPetIDs },
    });

    const userIdToNamesMap = allUserNames.reduce((acc, user) => {
      acc[user._id?.toString()] = user.name;
      return acc;
    }, {});

    const petIdToNamesMap = allPetNames.reduce((acc, pet) => {
      acc[pet._id?.toString()] = pet.name;
      return acc;
    }, {});

    const combinedRequests = allRequest.map((request) => ({
      ...request.toObject(), // Convert Mongoose document to a plain JavaScript object
      username: userIdToNamesMap[request.userId?.toString()], // Get the name from the map
      petname: petIdToNamesMap[request.petId?.toString()],
    }));

    return res.status(200).json({
      success: true,
      data: combinedRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

///////change the status
const changeStatusController = async (req, res) => {
  try {
    const request = await adoptionSchema.findByIdAndUpdate(
      { _id: req.params.requestId },
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, error: "No request" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Successfully status changed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  postAnimalController,
  sendingAllRequestController,
  changeStatusController,
};

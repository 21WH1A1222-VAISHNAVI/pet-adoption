const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/userModel");
const animalSchema = require("../schemas/animalModel");
const { adoptionSchema } = require("../schemas/adoptionModel");

///////////for register
const registerController = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    // Hash password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userSchema({
      ...req.body,
      password: hashedPassword,
      name: firstName + " " + lastName,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User has been created! Now you should be able to log in.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

///////////for login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user._id }, 'secret', {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(200).send({
      message: "Login success successfully",
      success: true,
      token,
      userData: user,
    });
  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

///////////fetching all animals
const getAllAnimalsController = async (req, res) => {
  try {
    const allanimals = await animalSchema.find();

    if (!allanimals) {
      return res.status(404).json({
        success: false,
        message: "no animals found",
      });
    }

    return res.status(201).json({
      success: true,
      data: allanimals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//////////////adopting a animal
const adoptingController = async (req, res) => {
  try {
    const fetchAnimal = await animalSchema.findOne({
      _id: req.params.animalId,
    });

    if (!fetchAnimal) {
      return res.status(404).json({
        success: false,
        message: "No Animal Found!",
      });
    }

    const requestingAdoption = new adoptionSchema({
      userId: req.body.userId,
      petId: req.params.animalId,
    });

    await requestingAdoption.save();

    return res.status(201).json({
      success: true,
      message: "Request for adoption has been sent successfully",
    });
  } catch (error) {
    console.log("Error in Adoption : ", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

///////////sending all request
const sendAllRequestToUserController = async (req, res) => {
  try {
    const allRequests = await adoptionSchema.find({
      userId: req.body.userId,
    });
    // console.log(allRequest[0].petId);

    const petIds = allRequests.map((request) => request.petId);

    const allPets = await animalSchema.find({
      _id: { $in: petIds },
    });

    // Create a map of petIds to petNames for easy lookup
    const petIdToNameMap = allPets.reduce((acc, pet) => {
      acc[pet._id?.toString()] = pet.name;
      return acc;
    }, {});

    // Combine all requests with pet names
    const combinedRequests = allRequests.map((request) => ({
      ...request.toObject(), // Convert Mongoose document to a plain JavaScript object
      name: petIdToNameMap[request.petId?.toString()] , // Get the name from the map
    }));

    return res.status(201).json({
      success: true,
      allRequests: combinedRequests
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getAllAnimalsController,
  adoptingController,
  sendAllRequestToUserController,
};
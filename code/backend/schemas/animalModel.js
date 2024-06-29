const mongoose = require("mongoose");

const animalModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: {
      type: String,
    },
    description: {
      type: String,
      maxLength: 1024,
    },
    photos: [],
  },
  {
    timestamps: true,
  }
);

const animalSchema = mongoose.model("animal", animalModel);

module.exports = animalSchema;

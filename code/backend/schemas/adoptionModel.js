const mongoose = require("mongoose");

const adoptionModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "animal",
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  adoptionSchema: mongoose.model("adoption", adoptionModel),
};

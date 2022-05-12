const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Pets

const petsSchema = new Schema({
  petId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  breed: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    require: true,
  },
  ownerId: {
    type: String,
    require: true,
  },
  doctors: {
    type: Array,
    require: true,
  },
  vaccination: {
    type: Array,
    require: true,
  },
});

// export of model @ pets

module.exports = mongoose.model("Pet", petsSchema);

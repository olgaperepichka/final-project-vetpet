const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Doctors

const doctorsSchema = new Schema({
  drId: {
    type: String,
    require: true,
  },
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  clients: {
    type: Array,
    require: true,
  },
  pets: {
    type: Array,
    require: true,
  },
});

// export of model @ doctors

module.exports = mongoose.model("Doctor", doctorsSchema);

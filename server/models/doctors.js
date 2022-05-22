const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Doctors

const doctorsSchema = new Schema(
  {
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
      require: false,
    },
    pets: {
      type: Array,
      require: false,
    },
    appointments: {
      type: Array,
      require: false,
    },
  },
  {
    versionKey: false,
  }
);

// export of model @ doctors

module.exports = mongoose.model("Doctor", doctorsSchema);

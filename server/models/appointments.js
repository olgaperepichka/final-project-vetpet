const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Clients

const appointmentSchema = new Schema(
  {
    drId: {
      type: String,
      require: true,
    },
    clientId: {
      type: String,
      require: true,
    },
    petId: {
      type: String,
      require: true,
    },
    reason: {
      type: String,
      require: true,
    },
    dateTime: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

// export of model @ apointment

module.exports = mongoose.model("Appointment", appointmentSchema);

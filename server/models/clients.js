const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Clients

const clientsSchema = new Schema(
  {
    clientId: {
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

    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    doctors: {
      type: Array,
      require: true,
    },
    pets: {
      type: Array,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

// export of model @ clients

module.exports = mongoose.model("Client", clientsSchema);

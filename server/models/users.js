const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema of model @ Clients

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

// export of model @ user

module.exports = mongoose.model("User", userSchema);

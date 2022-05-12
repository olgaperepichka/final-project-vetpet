const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctors");
const Pet = require("../models/pets");
const Client = require("../models/clients");

// add new endpoints here
router.get("/doctors", (req, res) => {
  Doctor.find()
    .then((doctor) => {
      res.status(200).json({
        status: 200,
        data: doctor,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(err).json({
        status: err,
        message: "error",
      });
    });
});

router.get("/clients", (req, res) => {
  Client.find()
    .then((client) => {
      res.status(200).json({
        status: 200,
        data: client,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(err).json({
        status: err,
        message: "error",
      });
    });
});

router.get("/pets", (req, res) => {
  Pet.find()
    .then((pet) => {
      res.status(200).json({
        status: 200,
        data: pet,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(err).json({
        status: err,
        message: "error",
      });
    });
});

// this is our catch all redundant endpoints (for 404)
router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

module.exports = router;

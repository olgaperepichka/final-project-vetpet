const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctors");
const Pet = require("../models/pets");
const Client = require("../models/clients");
const Appointment = require("../models/appointments");

//DOCTORS
// GET "/doctors" (get info about all doctors)
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

//POST "/doctors" (add 1 new doctor)
router.post("/doctors", async (req, res) => {
  const drId = req.body.drId;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const clients = req.body.clients;
  const pets = req.body.pets;

  await Doctor.create(
    { drId, fname, lname, email, password, clients, pets },
    (err, data) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Add new doctor: something went wrong. Try again later!",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Add new doctor: ok",
      });
    }
  );
});

//PATCH "/doctors/:drId" (update selected doctor info)
router.patch("/doctors/:drId", async (req, res) => {
  const drId = req.params.drId;
  const query = { drId };
  const update = req.body;
  const options = { new: true };

  try {
    await Doctor.findOneAndUpdate(query, update, options, (err, data) => {
      console.log(err, data);
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Update doctor: something went wrong. Try again later!",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "update doctor: ok",
      });
    }).clone();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 401,
      message: "Update doctor: something went wrong. Try again later!",
    });
  }
});

//DELETE "/doctors/:drId"
router.delete("/doctors/:drId", async (req, res) => {
  const drId = req.params;
  await Doctor.findOneAndDelete(drId, (err, data) => {
    console.log(err, data);
    if (err) {
      throw new Error();
    }
    return res.status(200).json({
      status: 200,
      message: "Remove doctor: ok",
    });
  });
});

//GET "/doctors/:drId" (get info of 1 selected doctor)
router.get("/doctors/:drId", (req, res) => {
  const drId = req.params;
  Doctor.findOne(drId)
    .lean()
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

//CLIENTS
//get info about all clients
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

//get info about selected client
router.get("/clients/:clientId", (req, res) => {
  const clientId = req.params;
  Client.findOne(clientId)
    .lean()
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

//POST "/clients" (add 1 new client)
router.post("/clients", async (req, res) => {
  const clientId = req.body.clientId;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const clients = req.body.clients;
  const pets = req.body.pets;

  await Client.create(
    { clientId, fname, lname, email, password, phone, address, doctors, pets },
    (err, data) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: err,
        });
      }
      res.status(200).json({
        status: 200,
        message: "Add new doctor: ok",
      });
    }
  );
});

//PATCH "/doctors/:drId" (update selected doctor info)
router.patch("/client/:clientId", async (req, res) => {
  const drId = req.params.drId;
  const query = { clientId };
  const update = req.body;
  const options = { new: true };

  try {
    await Doctor.findOneAndUpdate(query, update, options, (err, data) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Update client: error",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "update client: ok",
      });
    }).clone();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 401,
      message: "Update doctor: something went wrong. Try again later!",
    });
  }
});

//DELETE "/doctors/:drId"
router.delete("/clients/:clientId", async (req, res) => {
  const clientId = req.params;
  await Client.findOneAndDelete(drId, (err, data) => {
    console.log(err, data);
    if (err) {
      throw new Error();
    }
    return res.status(200).json({
      status: 200,
      message: "Remove client: ok",
    });
  });
});

//******************* */
//PETS
//GET info about all pets
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

//Appointments
//GET all appointments
router.get("/appointments", (req, res) => {
  Appointment.find()

    .then((appointment) => {
      res.status(200).json({
        status: 200,
        data: appointment,
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

// POST (make an appointment)
router.post("/appointments", async (req, res) => {
  const drId = req.body.drId;
  const petId = req.body.petId;
  const clientId = req.body.clientId;
  const reason = req.body.reason;
  const dateTime = req.body.dateTime;

  console.log({ drId, petId, clientId, reason, dateTime }),
    await Appointment.create(
      { drId, petId, clientId, reason, dateTime },
      (err, data) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            message: "Add new appointment: ERROR. Try again later!",
          });
        }
        res.status(200).json({
          status: 200,
          message: "Appointment added",
        });
      }
    );
});

//get info about particular pet
router.get("/pets/:petId", (req, res) => {
  const petId = req.params;
  Pet.findOne(petId)
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

// this is our catch all other endpoints (error 404)
router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

module.exports = router;

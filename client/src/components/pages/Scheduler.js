import React, { useState } from "react";
import ServerPath from "../../const/const";

const Scheduler = () => {
  const [appointment, setAppointment] = useState({
    drId: "",
    clientId: "",
    petId: "",
    reason: "",
    dateTime: "",
  });
  const [error, setErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(appointment);
    fetch(`${ServerPath}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("appontment made");
          return;
        }
        if (response.status === 401) {
          setErrors(response.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3>Make an appointment</h3>

      <form id="makeAppointment" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          id="drId"
          name="drId"
          placeholder="Doctor ID (drId#)"
          onChange={(e) =>
            setAppointment({ ...appointment, drId: e.target.value })
          }
        />
        <input
          type="text"
          required
          id="clientId"
          name="clientId"
          placeholder="Client ID (clientId#)"
          onChange={(e) =>
            setAppointment({ ...appointment, clientId: e.target.value })
          }
        />
        <input
          type="text"
          required
          id="petId"
          name="petId"
          placeholder="Pet ID (petId#)"
          onChange={(e) =>
            setAppointment({ ...appointment, petId: e.target.value })
          }
        />
        <input
          type="textarea"
          required
          id="reason"
          name="reason"
          placeholder="What is the reason of your appointment?"
          onChange={(e) =>
            setAppointment({ ...appointment, reason: e.target.value })
          }
        />
        <input
          type="datetime-local"
          id="appointment-time"
          name="appointment-time"
          // defaultValue="Date.now()"
          onChange={(e) =>
            setAppointment({ ...appointment, dateTime: e.target.value })
          }
        ></input>

        <button type="submit" id="make-rendezvous" value="submit">
          Make an appointment
        </button>
      </form>
    </>
  );
};

export default Scheduler;

import React, { useState } from "react";
import ServerPath from "../../const/const";

const DoctorForm = ({ doctor }) => {
  const [error, setErrors] = useState(false);
  const [doctorDataUpdate, setDoctorDataUpdate] = useState({});

  const updateDoctorData = (e) => {
    e.preventDefault();

    fetch(`${ServerPath}/doctors/${doctor.drId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorDataUpdate),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("doctor updated");
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
    <form id="modifyDoctor" onSubmit={updateDoctorData}>
      <div key={doctor["_id"]}>
        <input
          type="text"
          required
          name="drId"
          placeholder="Doctor ID (drId#)"
          value={doctor.drId}
          readOnly
        />
        <input
          type="text"
          required
          name="fname"
          placeholder="First name"
          defaultValue={doctor.fname}
          onChange={(e) =>
            setDoctorDataUpdate({ ...doctorDataUpdate, fname: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="lname"
          placeholder="Last name"
          defaultValue={doctor.lname}
          onChange={(e) =>
            setDoctorDataUpdate({ ...doctorDataUpdate, lname: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="email"
          placeholder="Email"
          defaultValue={doctor.email}
          onChange={(e) =>
            setDoctorDataUpdate({ ...doctorDataUpdate, email: e.target.value })
          }
        />
        <input
          type="text"
          required
          name="password"
          placeholder="Password"
          defaultValue={doctor.password}
          onChange={(e) =>
            setDoctorDataUpdate({
              ...doctorDataUpdate,
              password: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="clients"
          placeholder="clients"
          defaultValue={doctor.clients}
          onChange={(e) =>
            setDoctorDataUpdate({
              ...doctorDataUpdate,
              clients: e.target.value,
            })
          }
        />
        <input
          type="text"
          name="pets"
          placeholder="pets"
          defaultValue={doctor.pets}
          readOnly
        />
        <button type="submit" value="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;

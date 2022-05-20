import React, { useState, useEffect } from "react";
import ServerPath from "../../const/const";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";
import DoctorForm from "./DoctorForm";

const Admin = (doctor) => {
  const [error, setErrors] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorDataDelete, setDoctorDataDelete] = useState({});

  //list of all doctors
  useEffect(() => {
    fetch(`${ServerPath}/doctors`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error! status: ${res.status}`);
        }
      })
      .then((data) => {
        setDoctors(data.data);
      });
  }, [error]);

  //form to add new doctor
  const createNewDoctor = (e) => {
    e.preventDefault();
    const doctorData = {
      drId: e.target.drId.value,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(doctorData);
    fetch(`${ServerPath}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("doctor created");
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

  // delete doctor
  const deleteDoctor = (e) => {
    e.preventDefault();
    fetch(`${ServerPath}/doctors/${doctorDataDelete.drId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorDataDelete),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("doctor deleted");
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
    <Wrapper>
      <Title>Admin Access</Title>
      <h3>List of all doctors:</h3>
      <div>
        <input disabled value="Doctor ID (drId)" />
        <input disabled value="First Name" />
        <input disabled value="Last Name" />
        <input disabled value="Email" />
        <input disabled value="Password" />
        <input disabled value="List of Clients" />
        <input disabled value="List of Pets" />
      </div>

      {/* update doctor data */}
      {doctors.map((doctor) => {
        return <DoctorForm key={doctor.drId} doctor={doctor} />;
      })}

      <h3>Add new doctor</h3>
      <form id="createNewDoctor" onSubmit={createNewDoctor}>
        <input
          type="text"
          required
          id="drId"
          name="drId"
          placeholder="Doctor ID (drId#)"
        />
        <input
          type="text"
          required
          id="fname"
          name="fname"
          placeholder="First name"
        />
        <input
          type="text"
          required
          id="lname"
          name="lname"
          placeholder="Last name"
        />
        <input
          type="text"
          required
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          required
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" id="submitNewDoctor" value="submit">
          Add New Doctor
        </button>
      </form>

      {/* remove doctor */}
      <h3>Remove doctor</h3>
      <form id="deleteDoctorForm" onSubmit={deleteDoctor}>
        <input
          type="text"
          required
          name="drId"
          placeholder="Doctor ID (drId#)"
          onChange={(e) => setDoctorDataDelete({ drId: e.target.value })}
        />
        <button type="submit" id="deleteDoctorBtn" value="submit">
          Delete Doctor
        </button>
      </form>
    </Wrapper>
  );
};

export default Admin;

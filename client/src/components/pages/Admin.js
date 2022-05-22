import React, { useState, useEffect } from "react";
import ServerPath from "../../const/const";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";
import DoctorForm from "./DoctorForm";
import ClientForm from "./ClientForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import styled from "styled-components";

const Admin = (doctor) => {
  const [error, setErrors] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorDataDelete, setDoctorDataDelete] = useState({});
  const [clients, setClients] = useState([]);
  const [clientDataDelete, setClientDataDelete] = useState({});
  // const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);

  // check if user is authorized
  onAuthStateChanged(auth, (user) => {
    if (user !== null && user.email === "admin@test.com") {
      document.getElementById("authorizedUser").style.display = "inline-block";
      document.getElementById("wrongUser").style.display = "none";
    } else {
      document.getElementById("authorizedUser").style.display = "none";
      document.getElementById("wrongUser").style.display = "inline-block";
    }
  });

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
    fetch(`${ServerPath}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
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

  //CLIENTS requests and data:

  //list of all doctors
  useEffect(() => {
    fetch(`${ServerPath}/clients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error! status: ${res.status}`);
        }
      })
      .then((data) => {
        setClients(data.data);
      });
  }, [error]);

  //form to add new doctor
  const createNewClient = (e) => {
    e.preventDefault();
    const clientData = {
      clientId: e.target.clientId.value,
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    fetch(`${ServerPath}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
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

  // delete client
  const deleteClient = (e) => {
    e.preventDefault();
    fetch(`${ServerPath}/clients/${clientDataDelete.clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientDataDelete),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("client deleted");
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

  // list of appointments
  useEffect(() => {
    fetch(`${ServerPath}/appointments`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error! status: ${res.status}`);
        }
      })
      .then((data) => {
        setAppointments(data.data);
      });
  }, [error]);

  return (
    <Wrapper>
      <Title>Admin Access</Title>
      <div id="authorizedUser">
        <DoctorsDiv>
          <h3>DOCTORS</h3>
          <Label>
            <input disabled value="Doctor ID (drId)" />
            <input disabled value="First Name" />
            <input disabled value="Last Name" />
            <input disabled value="Email" />
            <input disabled value="Password" />
            <input disabled value="List of Clients" />
            <input disabled value="List of Pets" />
            <button disabled id="invisibleBtn">
              Update
            </button>
          </Label>

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
        </DoctorsDiv>
        <ClientsDiv>
          {" "}
          {/* ***********CLIENTS********** */}
          {/* update client data */}
          <h3> CLIENTS:</h3>
          {clients.map((client) => {
            return <ClientForm key={client.clientId} client={client} />;
          })}
          <h3>Add new client</h3>
          <form id="createNewClient" onSubmit={createNewClient}>
            <input
              type="text"
              required
              id="clientId"
              name="clientId"
              placeholder="client ID (clientId#)"
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
            <input
              type="text"
              required
              id="phone"
              name="phone"
              placeholder="Phone"
            />
            <input
              type="text"
              required
              id="address"
              name="address"
              placeholder="Address"
            />
            <button type="submit" id="submitNewClient" value="submit">
              Add New Client
            </button>
          </form>
          {/* remove client */}
          <h3>Remove client</h3>
          <form id="deleteClientForm" onSubmit={deleteClient}>
            <input
              type="text"
              required
              name="clientId"
              placeholder="Client ID (clientId#)"
              onChange={(e) =>
                setClientDataDelete({ clientId: e.target.value })
              }
            />
            <button type="submit" id="deleteClientBtn" value="submit">
              Delete Client
            </button>
          </form>
        </ClientsDiv>

        {/* APPOINTMENT */}
        <AppointmentsDiv>
          <h3> List of appointments:</h3>
          <div>
            {appointments.map((appointment) => {
              return (
                <div key={appointment["_id"]}>
                  <p className="rendevous-info">
                    Doctor ({appointment["drId"]}) on&nbsp;
                    {appointment["dateTime"].replace("T", " at ")} has&nbsp;
                    {appointment["clientId"]} (with {appointment["petId"]}){" "}
                  </p>
                </div>
              );
            })}
          </div>
        </AppointmentsDiv>
      </div>

      <div id="wrongUser">
        <h3>
          Attention! <br />
          Unauthorized access! <br />
          Please <a href="/login">login</a> as admin!
        </h3>
      </div>
    </Wrapper>
  );
};

export default Admin;

const Label = styled.div`
  #invisibleBtn {
    visibility: hidden;
  }
`;

const DoctorsDiv = styled.div`
  background-color: gray;
  padding: 50px 10px;
  margin: 25px 10px;
`;

const ClientsDiv = styled.div`
  background-color: orange;
  padding: 50px;
  margin: 25px 10px;
`;

const AppointmentsDiv = styled.div`
  background-color: black;
  color: orange;
  padding: 50px 10px;
  margin: 25px 10px;
`;

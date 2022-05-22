import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";
import ServerPath from "../../const/const";
import Scheduler from "./Scheduler";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

const Doctor = () => {
  const { drId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [clients, setClients] = useState([]);
  const [pets, setPets] = useState([]);
  // const [user, setUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      return;
    } else {
      document.getElementById("clientList").style.display = "none";
      document.getElementById("petsList").style.display = "none";
    }
  });

  //display doctor's personal data
  useEffect(() => {
    fetch(`${ServerPath}/doctors/${drId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error within Doctor data! Status: ${res.status}`);
        }
      })
      .then((data) => {
        setDoctor(data.data);
      })
      .catch((error) => console.log(error));
  }, [drId]);

  //display clients of selected doctor
  useEffect(() => {
    fetch(`${ServerPath}/clients`)
      .then((res) => res.json())
      .then((json) => {
        if (!doctor) {
          return;
        }
        const allClients = json.data;
        const filteredClients = allClients.filter((client) =>
          doctor.clients.some((id) => id === client.clientId)
        );
        setClients(filteredClients);
      });
  }, [doctor]);

  //display pets of selected doctor
  useEffect(() => {
    fetch(`${ServerPath}/pets`)
      .then((res) => res.json())
      .then((json) => {
        if (!doctor) {
          return;
        }
        const allPets = json.data;
        const filteredPets = allPets.filter((pet) =>
          doctor.pets.some((id) => id === pet.petId)
        );
        setPets(filteredPets);
      });
  }, [doctor]);

  if (!doctor) {
    return <p>"loading"</p>;
  }
  return (
    <Wrapper>
      <InfoWrapper>
        <Title>
          Dr. {doctor.fname} {doctor.lname}
        </Title>
        <PersonalInfo>
          <DoctorEmail>Email: {doctor.email}</DoctorEmail>
        </PersonalInfo>
        <SomeInfo>
          <p>
            <strong>
              Some information about doctor {doctor.fname} {doctor.lname}:
            </strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. <br />
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>

          <img src="/doctors-stripe.jpeg" alt="doctors" />
        </SomeInfo>

        <ClientsList id="clientList">
          <ul>
            <h3>Clients: </h3>
            {clients.map(function (client) {
              return (
                <li key={`${client.clientId}`}>
                  <Link to={`/clients/${client.clientId}`}>
                    {client.fname} {client.lname}
                  </Link>{" "}
                </li>
              );
            })}
          </ul>
        </ClientsList>
        <PetsList id="petsList">
          <ul>
            <h3>Pets</h3>
            {pets.map(function (pet) {
              return (
                <li key={`${pet.petId}`}>
                  <Link to={`/pets/${pet.petId}`}>{pet.name}</Link> ({" "}
                  {pet.breed} )
                </li>
              );
            })}
          </ul>
        </PetsList>
      </InfoWrapper>
      <Scheduler />
    </Wrapper>
  );
};

const SomeInfo = styled.div`
  margin-bottom: -55px;
  p {
    padding: 10px;
    font-size: 18px;
  }
  img {
    width: 100%;
    padding: 50px 0px;
  }
`;

const InfoWrapper = styled.div``;
const PersonalInfo = styled.div`
  padding: 25px 10px;
  line-height: 1.5;
`;
const DoctorEmail = styled.div`
  font-size: 19px;
`;
const ClientsList = styled.div`
  padding: 50px 10px;
  line-height: 2;
  background: darkgreen;
  h3 {
    color: white;
    font-family: "Pacifico";
  }
  font-size: 19px;
`;
const PetsList = styled.div`
  padding: 50px 10px;
  line-height: 2;
  background: orange;
  font-size: 19px;
  h3 {
    color: darkslategray;
    font-family: "Pacifico";
  }
  a {
    color: green;
  }
`;

export default Doctor;

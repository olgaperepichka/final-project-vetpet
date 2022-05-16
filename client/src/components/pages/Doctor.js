import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";
import ServerPath from "../../const/const";

const Doctor = () => {
  const { drId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [clients, setClients] = useState([]);
  const [pets, setPets] = useState([]);

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
          <DoctorPassword>Password: {doctor.password}</DoctorPassword>
        </PersonalInfo>

        <ClientsList>
          <ul>
            Clients:{" "}
            {clients.map(function (client) {
              return (
                <li key={`${client.clientId}`}>
                  <Link to={`/clients/${client.clientId}`}>
                    {client.lname} {client.fname}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ClientsList>
        <PetsList>
          <ul>
            Pets:{" "}
            {pets.map(function (pet) {
              return (
                <li key={`${pet.petId}`}>
                  {pet.name} (breed: {pet.breed} )
                </li>
              );
            })}
          </ul>
        </PetsList>
      </InfoWrapper>
    </Wrapper>
  );
};

const InfoWrapper = styled.div``;
const PersonalInfo = styled.div`
  padding: 25px 10px;
  line-height: 1.5;
`;
const DoctorEmail = styled.div``;
const DoctorPassword = styled.div``;
const ClientsList = styled.div`
  padding: 25px 10px;
`;
const PetsList = styled.div`
  padding: 25px 10px;
`;

export default Doctor;

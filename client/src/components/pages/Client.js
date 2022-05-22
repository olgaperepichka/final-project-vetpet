import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Title, Subtitle } from "../../GlobalStyles/page-styles";
import ServerPath from "../../const/const";
import moment from "moment";

const Client = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [pets, setPets] = useState([]);

  //display client's personal data
  useEffect(() => {
    fetch(`${ServerPath}/clients/${clientId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error within Client data! Status: ${res.status}`);
        }
      })
      .then((data) => {
        setClient(data.data);
      })
      .catch((error) => console.log(error));
  }, [clientId]);

  //display doctors of selected client
  useEffect(() => {
    fetch(`${ServerPath}/doctors`)
      .then((res) => res.json())
      .then((json) => {
        const allDoctors = json.data;
        if (!client) {
          return;
        }

        const filteredDoctors = allDoctors.filter((doctor) =>
          client.doctors.some((id) => id === doctor.drId)
        );
        setDoctors(filteredDoctors);
      });
  }, [client]);

  //display pets of selected client
  useEffect(() => {
    fetch(`${ServerPath}/pets`)
      .then((res) => res.json())
      .then((json) => {
        if (!client) {
          return;
        }
        const allPets = json.data;
        const filteredPets = allPets.filter((pet) =>
          client.pets.some((id) => id === pet.petId)
        );
        setPets(filteredPets);
      });
  }, [client]);

  if (!client) {
    return <p>"loading"</p>;
  }
  return (
    <Wrapper>
      <InfoWrapper>
        <Title>Client</Title>
        <Subtitle>
          {client.fname} {client.lname}
        </Subtitle>
        <PersonalInfo>
          <ClientEmail>
            <strong>Email: </strong>
            {client.email}
          </ClientEmail>
          <ClientPhone>
            <strong>Phone:</strong> {client.phone}
          </ClientPhone>
          <ClientAddress>
            <strong>Address:</strong> {client.address}
          </ClientAddress>
        </PersonalInfo>

        <DrList>
          <ul>
            <h3>Doctors who did vaccination: </h3>
            {doctors.map(function (doctor) {
              return (
                <li key={`${doctor.drId}`}>
                  Dr. {doctor.fname} {doctor.lname}
                </li>
              );
            })}
          </ul>
        </DrList>

        <PetsList>
          <h3>Owner of Pets: </h3>
          {pets.map(function (pet) {
            const petBirthday = moment(pet.dateOfBirth).format("DD MMM, YYYY");
            return (
              <PetInfo key={`${pet.petId}`}>
                <h4>{pet.name}</h4>
                <div>Breed: {pet.breed}</div>
                <div>Age: {pet.age}</div>
                <div>Date of pet's birth: {petBirthday}</div>
                <VaccineContainer>
                  <strong>
                    <u>Vaccinations:</u>
                  </strong>
                  {pet.vaccination.map((vaccine, doctor) => (
                    <Vaccine key={`${vaccine.vaccineName}`}>
                      <div>Vaccine name: {vaccine.vaccineName}</div>
                      <div>Vaccine Date: {vaccine.vaccineDate}</div>
                      <div>
                        Vaccine done by doctor:
                        {doctors
                          .filter((doctor) => {
                            return doctor.drId === vaccine.dutyDoctor;
                          })
                          .map((vaccineDr) => (
                            <span key={`${vaccineDr.dutyDoctor}`}>
                              {vaccineDr.fname} {vaccineDr.lname}
                            </span>
                          ))}
                      </div>
                    </Vaccine>
                  ))}
                </VaccineContainer>
              </PetInfo>
            );
          })}
        </PetsList>
      </InfoWrapper>
    </Wrapper>
  );
};

const InfoWrapper = styled.div``;

const PersonalInfo = styled.div`
  padding: 25px 10px;
  line-height: 1.5;
  border: 1px solid black;
  box-shadow: 0px 2px 10px 10px #888;
  border-radius: 10px;
  width: 30%;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const ClientEmail = styled.div``;
const ClientPhone = styled.div``;
const ClientAddress = styled.div``;
const DrList = styled.div`
  margin-top: 40px;
  padding: 25px 10px;
  color: darkgreen;
  background-color: orange;
  line-height: 1.8;

  h3 {
    font-family: "Pacifico", cursive;
    font-size: 38px;
  }
`;
const PetsList = styled.div`
  padding: 50px 10px 0px 10px;
  background-color: lightgray;
  margin-bottom: -75px;

  h3 {
    font-family: "Pacifico", cursive;
    font-size: 38px;
  }
`;

const PetInfo = styled.div`
  /* border: 1px solid black; */
  padding: 25px 10px;
  margin: 25px 10px;
  line-height: 1.5;
  font-size: 18px;
  h4 {
    font-family: "Pacifico";
    font-size: 30px;
    padding-bottom: 25px;
    color: var(--color-orange);
  }
`;

const VaccineContainer = styled.div`
  padding-top: 25px;
`;

const Vaccine = styled.div`
  padding: 10px;
  margin: 10px;

  span {
    padding-left: 5px;
  }
`;
export default Client;

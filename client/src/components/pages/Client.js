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
        console.log("allDoctors:", allDoctors);

        console.log("allClients:", client);

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
          <ClientEmail>Email: {client.email}</ClientEmail>
          <ClientPassword>Password: {client.password}</ClientPassword>
          <ClientPhone>Phone: {client.phone}</ClientPhone>
          <ClientAddress>Address: {client.address}</ClientAddress>
        </PersonalInfo>

        <DrList>
          <ul>
            My Doctors:{" "}
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
          Owner of Pets:{" "}
          {pets.map(function (pet) {
            const petBirthday = moment(pet.dateOfBirth).format("DD MMM, YYYY");
            return (
              <PetInfo key={`${pet.petId}`}>
                <div>Name: {pet.name}</div>
                <div>Breed: {pet.breed}</div>
                <div>Age: {pet.age}</div>
                <div>Date of pet's birth: {petBirthday}</div>
                <VaccineContainer>
                  Vaccinations:&nbsp;
                  {pet.vaccination.map((vaccine, doctor) => (
                    <Vaccine key={`${vaccine.vaccineName}`}>
                      <div>Vaccine: {vaccine.vaccineName}</div>
                      <div>VaccineDate: {vaccine.vaccineDate}</div>
                      <div>
                        Doctor who did vaccination:
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
`;
const ClientEmail = styled.div``;
const ClientPassword = styled.div``;
const ClientPhone = styled.div``;
const ClientAddress = styled.div``;
const DrList = styled.div`
  padding: 25px 10px;
`;
const PetsList = styled.div`
  padding: 25px 10px;
`;

const PetInfo = styled.div`
  border: 1px solid black;
  padding: 25px 10px;
  margin: 25px 10px;
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

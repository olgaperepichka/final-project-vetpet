import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Title, Subtitle } from "../../GlobalStyles/page-styles";
import ServerPath from "../../const/const";
import moment from "moment";

const Pet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [client, setClient] = useState([]);

  //display data about pet
  useEffect(() => {
    fetch(`${ServerPath}/pets/${petId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error within Client data! Status: ${res.status}`);
        }
      })
      .then((data) => {
        setPet(data.data);
      })
      .catch((error) => console.log(error));
  }, [petId]);

  //display doctors of selected pet
  useEffect(() => {
    fetch(`${ServerPath}/doctors`)
      .then((res) => res.json())
      .then((json) => {
        const allDoctors = json.data;
        if (!pet) {
          return;
        }

        const filteredDoctors = allDoctors.filter((doctor) =>
          pet.doctors.some((id) => id === doctor.drId)
        );
        setDoctors(filteredDoctors);
      });
  }, [pet]);

  useEffect(() => {
    fetch(`${ServerPath}/clients`)
      .then((res) => res.json())
      .then((json) => {
        if (!pet) {
          return;
        }
        const allClients = json.data;
        const filteredClients = allClients.find((client) => {
          return client.clientId === pet.ownerId;
        });
        setClient(filteredClients);
      });
  }, [pet]);

  if (!pet) {
    return <p>"loading"</p>;
  }
  return (
    <Wrapper>
      <InfoWrapper>
        <Title>Pet: {pet.name}</Title>
        <Subtitle>(ID: {pet.petId})</Subtitle>
        <PetInfo>
          <img src="/logo-dog.jpg" alt="logo-dog" />
          <div>Breed: {pet.breed}</div>
          <div>Age: {pet.age}</div>
          <div>
            Date of pet's birth:{" "}
            {moment(pet.dateOfBirth).format("DD MMM, YYYY")}
          </div>
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

        <DoctorList>
          <img src="/related-doctors.jpeg" />
          <ul>
            <h3>Related Doctors: </h3>
            {doctors.map(function (doctor) {
              return (
                <li key={`${doctor.drId}`}>
                  Dr. {doctor.fname} {doctor.lname}
                </li>
              );
            })}
          </ul>
        </DoctorList>

        <OwnerInfo>
          <OwnerName>
            <h3>Owner:</h3>
            Name:{" "}
            <Link to={`/clients/${client.clientId}`}>
              {client.fname} {client.lname}
            </Link>
          </OwnerName>
          <ClientEmail>Email: {client.email}</ClientEmail>
          <ClientPhone>Phone: {client.phone}</ClientPhone>
          <ClientAddress>Address: {client.address}</ClientAddress>
        </OwnerInfo>
      </InfoWrapper>
    </Wrapper>
  );
};

const InfoWrapper = styled.div``;
const OwnerInfo = styled.div`
  padding: 75px 10px;
  line-height: 1.5;
  background: darkslategray;
  color: whitesmoke;
  h3 {
    color: var(--color-orange);
    font-family: "Pacifico";
  }
`;
const OwnerName = styled.div``;
const ClientEmail = styled.div``;
const ClientPhone = styled.div``;
const ClientAddress = styled.div``;
const DoctorList = styled.div`
  padding: 50px 10px 75px 10px;
  font-size: 18px;
  h3 {
    font-family: "Pacifico";
  }
  img {
    width: 100%;
    padding-bottom: 50px;
  }
`;
const PetInfo = styled.div`
  padding: 25px 10px;
  background: gray;
  color: whitesmoke;
  font-size: 18px;

  img {
    width: 250px;
    border-radius: 50%;
    margin: 25px auto;
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
export default Pet;

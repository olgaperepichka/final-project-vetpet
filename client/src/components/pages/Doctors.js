import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper, Title, Subtitle } from "../../GlobalStyles/page-styles";
import ServerPath from "../../const/const";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch(`${ServerPath}/doctors`)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error! status: ${res.status}`);
        }
      })
      .then((data) => {
        setDoctors(data.data);
      });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Our Doctors</Title>
        <Subtitle>The team that you trust</Subtitle>
        <Cards>
          {doctors.map((doctor) => {
            return (
              <Card key={doctor["_id"]}>
                <h2 className="name">
                  Dr. {doctor["fname"]}&nbsp;{doctor["lname"]}
                </h2>
              </Card>
            );
          })}
        </Cards>
      </Wrapper>
      <Image src="doctors_bkg.png" />
    </Container>
  );
};

export default Doctors;

const Image = styled.img`
  width: 80vw;
  margin-top: -58vh;
  margin-right: 35px;
  z-index: -100;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 50px;

  @media (max-width: 1024px) {
    padding: 0px 10px 50px 10px;
  }
`;

const Card = styled.div`
  border: solid 1px black;
  color: black;
  padding: 10px;
  margin: 10px;
  height: 200px;
  min-width: 300px;
  block-size: fit-content;
  text-align: center;
  border-radius: 20px;
  box-shadow: 4px 4px 10px 4px #888888;
  border: 5px solid none;
  border-radius: 12px;

  .name {
    background: -webkit-linear-gradient(orange, black, orange);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 22px;
    margin: 10px auto;
  }

  @media (max-width: 300px) {
    min-width: 250px;
  }
`;

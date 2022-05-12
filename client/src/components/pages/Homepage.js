import React from "react";
import { useState, useEffect } from "react";
import { Wrapper, Title, Subtitle } from "../../GlobalStyles/page-styles";
import styled from "styled-components";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);

  //fetch data from API to display breeds and info about selected breed
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://api.TheDogAPI.com/v1/breeds`);
        if (!response.ok) {
          throw new Error(
            `ERROR! Something goes wrong... The status is ${response.status}`
          );
        }
        let apiData = await response.json();
        console.log(apiData);
        setData(apiData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  //handle data from selected list with dogs
  const handleOnChange = (e) => {
    const id = e.target.value;
    const dog = data.find((x) => x.id === parseInt(id));
    setSelectedDog(dog);
  };

  return (
    <Wrapper>
      <Title>Welcome to VetPet Clinic!</Title>
      <Subtitle>We look forward to caring for your pet</Subtitle>
      <KYTservices>
        <ChooseBreed>
          <h3>Know Your Pet (KYT)</h3>
          <span>Choose Breed:</span>
          {loading && <span>A moment please...</span>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          <span>
            <select onChange={handleOnChange}>
              {data &&
                data.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </span>
          {selectedDog && (
            <DogContainer>
              <h4>{selectedDog.name}</h4>
              <div>Breed group: {selectedDog.breed_group}</div>
              <div>Breed for: {selectedDog.bred_for}</div>
              <div>Temperament: {selectedDog.temperament}</div>
              <div>Life Span: {selectedDog.life_span}</div>
              <div>Height: {selectedDog.height.metric} cm</div>
              <div>Weight: {selectedDog.weight.metric} kg</div>
              <div>
                <img alt={selectedDog.name} src={selectedDog.image.url} />
              </div>
            </DogContainer>
          )}
        </ChooseBreed>
        <Services>
          <h3>Our Services</h3>
          <h4>Vaccination</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h4>Sterilization / Micro-chipping</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h4>Yearly check-up</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Services>
      </KYTservices>
      <Team>
        <TeamTextDiv>
          <h3>Our doctors</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <a className="cta" href="/doctors">
            Meet our team
          </a>
        </TeamTextDiv>
        <TeamImgDiv>
          <img alt="doctors" src="doctors.jpg" />
        </TeamImgDiv>
      </Team>
    </Wrapper>
  );
};

export default Homepage;

const Team = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TeamTextDiv = styled.div`
  width: 50%;
  padding: 20px 20px 50px 20px;
  width: 50%;
  background: var(--color-orange);
  line-height: 1.5;
  text-align: center;
  color: var(--color-whitesmoke);

  h3 {
    color: darkslategray;
  }

  p {
    text-align: left;
    padding-bottom: 50px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TeamImgDiv = styled.div`
  line-height: 0;
  width: 50%;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const KYTservices = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Services = styled.div`
  width: 50%;
  padding: 20px 20px;
  margin: 25px 0px;
  width: 50%;
  background: var(--color-orange);
  line-height: 1.5;
  text-align: left;
  color: var(--color-whitesmoke);

  h3 {
    color: var(--color-whitesmoke);
  }

  h4 {
    color: darkslategray;
    padding: 10px 0px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

const ChooseBreed = styled.div`
  padding: 20px 0px;
  margin: 25px 0px;
  width: 50%;

  h3 {
    color: orange;
  }

  span {
    margin-top: 20px;
  }
  h4 {
    font-size: 32px;
    padding-bottom: 15px;
  }
  select {
    margin-left: 20px;
    padding-left: 5px;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;

    select {
      margin-left: 5px;
    }

    h3 {
      margin-top: -40px;
    }
  }
`;
const DogContainer = styled.div`
  padding: 20px 10px;
  line-height: 1.5;

  img {
    padding-top: 25px;
    width: 60%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

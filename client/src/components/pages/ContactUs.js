import React from "react";
import styled from "styled-components";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";

const Contact = () => {
  return (
    <>
      <Wrapper>
        <Title>Contact Us</Title>
        <MapWrapper>
          <MapDiv>
            <iframe
              title="VetPet clinic"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89717.29580245879!2d-73.47066715516753!3d45.35556431319153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9a6d492e8eb77%3A0x4a3e61f17572a268!2sH%C3%B4pital%20V%C3%A9t%C3%A9rinaire%20du%20Haut-Richelieu!5e0!3m2!1sen!2sca!4v1650585131492!5m2!1sen!2sca"
              allowFullScreen="yes"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapDiv>
          <AddressDiv>
            <h2>VetPet Clinic</h2>
            <h3>(Haut-Richelieu Veterinary Hospital)</h3>
            <p>
              467 Bd Saint-Luc,
              <br />
              Saint-Jean-sur-Richelieu, QC
              <br />
              J2W 1E7
            </p>
            <a
              href="https://www.google.com/maps/place/H%C3%B4pital+V%C3%A9t%C3%A9rinaire+du+Haut-Richelieu/@45.3628152,-73.3109585,17z/data=!4m8!1m2!3m1!2sH%C3%B4pital+V%C3%A9t%C3%A9rinaire+du+Haut-Richelieu!3m4!1s0x4cc9a6d492e8eb77:0x4a3e61f17572a268!8m2!3d45.3628152!4d-73.3087642"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
            <ContactImg alt="dog photo" src="/basset.png" />
          </AddressDiv>
        </MapWrapper>
      </Wrapper>
    </>
  );
};

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;

  padding: 75px 50px;
  margin: 0px 10px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 20px;
    margin: 0px;
  }
`;

const MapDiv = styled.div`
  width: 50%;
  iframe {
    width: 100%;
    height: 375px;
  }

  @media (max-width: 768px) {
    padding: 10px 0px 30px 0px;
    margin: 0;
    width: 100%;
    iframe {
      width: 100%;
    }
  }
`;

const AddressDiv = styled.div`
  width: 45%;
  text-align: left;
  h3 {
    padding: 15px 0;
    font-size: 20px;
    margin-bottom: 0px;
    text-align: left;
  }
  p {
    padding: 10px 0px 25px 0px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px 15px 0px 15px;
  }
`;

const ContactImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  z-index: -500px;

  @media (max-width: 768px) {
    width: 50%;
    position: absolute;
    top: 310px;
    right: 10px;
  }

  @media (max-width: 540px) {
    top: 400px;
  }

  @media (max-width: 500px) {
    top: 450px;
    right: 10px;
  }

  @media (max-width: 375px) {
    top: 500px;
    right: 20px;
  }

  @media (max-width: 280px) {
    top: 555px;
    right: -5px;
  }
`;

export default Contact;

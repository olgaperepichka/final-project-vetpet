import React from "react";
import styled from "styled-components";

const PawsStripe = () => {
  return (
    <>
      <Stripe />
    </>
  );
};

export default PawsStripe;

const Stripe = styled.div`
  margin-top: 70px;
  padding-top: 60px;
  background-image: url("/paws.png");
  background-size: contain;
`;

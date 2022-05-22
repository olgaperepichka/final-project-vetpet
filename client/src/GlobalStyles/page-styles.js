import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 80px;
  text-align: center;
  box-shadow: 0px 10px 5px #888, 0px -10px 5px #888;
  margin-bottom: 75px;
  padding: 50px 0px;

  h3 {
    font-size: 28px;
    line-height: 1.5;
    margin-bottom: 10px;
    text-align: center;
  }

  .cta {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: whitesmoke;
    color: darkslategray;
    text-decoration: none;
  }
`;
const Title = styled.h1`
  color: var(--color-orange);
  text-transform: uppercase;
  font-size: 52px;
`;

const Subtitle = styled.h2`
  color: var(--color-mediumgray);
  line-height: 1.3;
  font-size: 36px;
  font-weight: 300;
  text-shadow: 0 1px 0px black;
  padding: 20px;
`;

export { Wrapper };
export { Title };
export { Subtitle };

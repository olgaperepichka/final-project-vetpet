import React from 'react';
import styled from "styled-components";
import Burger from './Burger';
import { NavLink } from "react-router-dom";

const Header = () => {

 return (
   <>
   <Nav>
      <LogoDiv to='/'>VetPet</LogoDiv>
      <Burger />
   </Nav>
   </>
   
 );
};

export default Header;


const Nav = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   height: 55px;
   border-bottom: 2px solid #f1f1f1;
   padding: 0 20px;
   background-color: white;
   position: fixed;
   z-index: 10;
   top: 0;
`

const LogoDiv = styled(NavLink)`
   padding: 10px;
   text-decoration: none;
   font-family: 'Pacifico', cursive;
   font-size: 38px;
`;
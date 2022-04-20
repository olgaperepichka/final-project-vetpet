import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = ({open}) => {
  return (
    <>
    <MenuWrapper open={open}>
      <li>
        <StyledNavLink to='/'>Homepage</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/contact'>Contact Us</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/login'>Login</StyledNavLink>
      </li>
    </MenuWrapper>
    </>
  )
}

export default Menu;

const MenuWrapper = styled.ul`
  width: 45%;
  display: flex;
  justify-content: space-around;
  flex-flow: row nowrap;
  list-style: none;
  z-index: 20;
  
  li{
    padding: 18px 0px;
    text-transform: uppercase;
    color: var(--color-mediumgray);
    font-size: 14px;
    font-weight: bold;
  }


/* text inside burger in mobile mode */
  @media(max-width: 768px){
    flex-flow: column nowrap;
    background-color: var(--color-black);
    color: orange;
    position: fixed;
    justify-content: flex-start;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    list-style: none;
    padding-top: 3.5rem;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    li{
      padding: 20px 30px;
      color: orange;
      text-transform: none;
    }
    /* .hide-mobile{
      display:none;
    } */
  }
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-mediumgray);

  &.active{
    color: var(--color-orange);
  }

  @media(max-width: 768px){
    color: orange;
    font-size: 26px;
  }
`

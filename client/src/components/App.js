import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import GlobalStyle from '../GlobalStyles/GlobalStyles';
import styled from "styled-components";
import Header from './Header/Header'
import Homepage from './pages/Homepage';
import Contact from './pages/ContactUs';
import Login from './pages/Login';


function App() {
  return (
    <>
    <GlobalStyle/>
    <AppWrapper>
        <Header/>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
    </AppWrapper>
  </>
  );
};

const AppWrapper = styled.div`
`


export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyles/GlobalStyles";
import styled from "styled-components";
import Header from "./Header/Header";
import Homepage from "./pages/Homepage";
import Contact from "./pages/ContactUs";
import Doctors from "./pages/Doctors";
import Doctor from "./pages/Doctor";
import Client from "./pages/Client";
import Pet from "./pages/Pet";
import Scheduler from "./pages/Scheduler";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PawsStripe from "./PawsStripe";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <PawsStripe />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:drId" element={<Doctor />} />
          <Route path="/clients/:clientId" element={<Client />} />
          <Route path="/pets/:petId" element={<Pet />} />
          <Route path="/appointments" element={<Scheduler />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppWrapper>
    </>
  );
}

const AppWrapper = styled.div``;

export default App;

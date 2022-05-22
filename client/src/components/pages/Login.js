import React from "react";
import styled from "styled-components";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  onAuthStateChanged(auth, (user) => {
    if (user !== null && user.email === "admin@test.com") {
      document.getElementById("gotoadmin").style.display = "inline-block";
    } else {
      document.getElementById("gotoadmin").style.display = "none";
    }
  });

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error, error.code, error.message);
    }
  };

  return (
    <Wrapper>
      <Title>Login page</Title>
      <div className="App">
        <Register>
          <h3>Register user</h3>
          <form id="signup-form" onSubmit={register}>
            <input
              placeholder="Email..."
              defaultValue={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password..."
              defaultValue={registerPassword}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <button type="submit" value="submit">
              Create user
            </button>
          </form>
        </Register>
      </div>

      <Img>
        <img src="/dog-cat.jpeg" alt="dog and family" />
      </Img>

      <LoginDiv>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          defaultValue={loginEmail}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          defaultValue={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <div className="adminButton">
          <AdminBtn id="gotoadmin">
            <a href="/admin">Go to admin</a>
          </AdminBtn>
        </div>

        <SignOutDiv>
          {" "}
          <h4>User Logged in: {user?.email}</h4>
          <button onClick={logout}>Signout</button>
        </SignOutDiv>
      </LoginDiv>
      <Img>
        <img src="/vetclinic.jpg" alt="dog and family" />
      </Img>
    </Wrapper>
  );
};

export default Login;

const Register = styled.div`
  margin: 50px 0px;
  padding: 50px 0px;
  background: whitesmoke;
  input {
    height: 30px;
    width: 150px;
    margin: 10px;
    border-radius: 5px;
    padding: 3px;
    border: 1px solid gray;
  }
  button {
    height: 30px;
    width: 150px;
    border-radius: 5px;
    padding: 3px;
    margin-left: 10px;
    border: 1px solid var(--color-orange);
    background: orange;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }
`;

const LoginDiv = styled.div`
  margin: 50px 0px;
  padding: 50px 0px;
  background: whitesmoke;
  input {
    height: 30px;
    width: 150px;
    margin: 10px;
    border-radius: 5px;
    padding: 3px;
    border: 1px solid gray;
  }
  button {
    height: 30px;
    width: 150px;
    border-radius: 5px;
    padding: 3px;
    margin-left: 10px;
    border: 1px solid var(--color-orange);
    background: orange;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }
`;
const AdminBtn = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: darkslategray;

  &:hover {
    cursor: pointer;
  }
`;

const SignOutDiv = styled.div`
  padding-top: 50px;
  line-height: 3;
`;

const Img = styled.div`
  img {
    width: 100%;
  }
`;

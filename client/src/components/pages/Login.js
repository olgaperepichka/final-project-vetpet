import React from "react";
import { Wrapper, Title } from "../../GlobalStyles/page-styles";

const Login = () => {
  return (
    <Wrapper>
      <Title>Login</Title>
      <form>
        <input type="text" required name="email" placeholder="email" />
        <input
          type="password"
          required
          name="password"
          placeholder="password"
        />
        <select name="role" id="role">
          <option value="doctor">Doctor</option>
          <option value="client">Client</option>
        </select>

        <button>Login</button>
      </form>
    </Wrapper>
  );
};

export default Login;

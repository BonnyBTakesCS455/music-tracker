import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Button from "../components/Button";
import { login } from "../services";

const LoginContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2550&q=80"); 
  background-size: cover;
  background-position: center;
`

const ButtonContainer = styled.div`
  margin-top: 30vh;
  z-index: 100;
`

const Filter = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  height: 100%;
  mix-blend-mode: color;
  background: black;
  z-index: 10;
`

const Filter2 = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  height: 100%;
  mix-blend-mode: soft-light;
  background: linear-gradient(#0fd122 60%, black);
  z-index: 11;
`

function Login() {
  /**
   * Obtains parameters from the hash of the URL
   * From https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/public/index.html
   * @return Object
   */

  function goToSpotifyAuthLogin() {
    login().then((data) => {
      window.location.replace(data.authorizeURL);
    });
  }

  return (
    <LoginContainer>
      <ButtonContainer>
        <Button onClick={goToSpotifyAuthLogin}>Login</Button>
      </ButtonContainer>
      <Filter />
      <Filter2 />
    </LoginContainer>
  );
}

export default Login;

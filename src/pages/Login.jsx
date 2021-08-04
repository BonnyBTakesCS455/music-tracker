import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { login } from "../services";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2989&q=80",
  "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
]

const backgroundImage = BACKGROUND_IMAGES[Math.floor(Math.random()*BACKGROUND_IMAGES.length)];

const LoginContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage}); 
  background-size: cover;
  background-position: center;
`

const ButtonContainer = styled.div`
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
  mix-blend-mode: overlay;
  background: linear-gradient(145deg, #0fd122 0%, black 70%);
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

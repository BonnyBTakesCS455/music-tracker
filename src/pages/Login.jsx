import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import "react-spotify-auth/dist/index.css";
import { login } from "../services";

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
    <>
      <header className="App-header">
        <Card>
          <h4>Login</h4>
          <Button onClick={goToSpotifyAuthLogin}>Login</Button>
        </Card>
      </header>
    </>
  );
}

export default Login;

import React, {useState} from "react";
import { connect } from "react-redux";
import { setUser } from "../state/management/userSettings";
import Card from "../components/Card";
import Button from "../components/Button";
import "react-spotify-auth/dist/index.css";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { CLIENT_ID, FRONTEND_SERVER } from "../constants";
import { getCurrentUserInfo, getTokens } from "../services";

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}

function mapStateToProps(state) {
    return {
      user: state.userSettings.user,
    };
  }

function Login({ setUser }) {
  const [accessToken, setAccessToken] = useState('');

  function getAndSetUser(accessToken, refreshToken) {
    getCurrentUserInfo(accessToken, refreshToken).then((userInfo) => {
      const email = userInfo.email;
      const name = userInfo.display_name;
      const spotifyId = userInfo.id;
      setUser({ name, email, spotifyId });
    });
  }

  /**
   * Obtains parameters from the hash of the URL
   * From https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/public/index.html
   * @return Object
   */
  function getHashParams() {
    // Split so the part parsed is just ?code=adsf&state=asdf instead of http://localhost:3000/callback?code=asdf...
    // which makes the key the entire URL
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    return {
        code: urlParams.get('code'),
        state: urlParams.get('state')
    }
  }

  function getAccessTokenAndRefreshToken() {
      if (accessToken !== '') {
          return;
      }
    const {code, _state} = getHashParams();
    getTokens(code).then(data => {
        const {accessToken, refreshToken } = data.body;
        setAccessToken(accessToken);
        getAndSetUser(accessToken, refreshToken);
    })
    console.log('code', code);

  }

  getAccessTokenAndRefreshToken();

  return (
    <>
      <header className="App-header">
        <Card>
          <h4>Logging In</h4>
        </Card>
      </header>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

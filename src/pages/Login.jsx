import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../state/management/userSettings'
import Card from '../components/Card';
import Button from '../components/Button';
import 'react-spotify-auth/dist/index.css'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { CLIENT_ID, FRONTEND_SERVER } from '../constants';
import { getCurrentUserInfo, login } from '../services';

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

function Login({ setUser }) {
  function getAndSetUser(token) {
    getCurrentUserInfo(token).then((userInfo) => {
      const email = userInfo.email;
      const name = userInfo.display_name;
      setUser({name, email});
    });
  /**
   * Obtains parameters from the hash of the URL
   * From https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/public/index.html
   * @return Object
   */

  function goToSpotifyAuthLogin() {
    login().then((data) => {
      window.location.replace(data.authorizeURL);
    })
  }

  return (
    <>
      <header className='App-header'>
        <Card>
          <h4>Login</h4>
          <Button onClick={goToSpotifyAuthLogin}>Login</Button>
        </Card>
      </header>
    </>
  );
}

export default connect(null, mapDispatchToProps)(Login);

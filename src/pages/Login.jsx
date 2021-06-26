import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../state/management/userSettings'
import Card from '../components/Card';
import 'react-spotify-auth/dist/index.css'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { CLIENT_ID, FRONTEND_SERVER } from '../constants';

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

function Login({ setUser }) {
  function getAndSetUser(token) {
    // TODO: retrieve these values from backend
    const email = 'bonnyb@gmail.com';
    const name = 'bonny b'
    setUser({email: email, name: name});
  }

  return (
    <>
      <header className='App-header'>
        <Card>
          <h4>Login</h4>
          <SpotifyAuth
            redirectUri={FRONTEND_SERVER}
            clientID={CLIENT_ID}
            scopes={Object.values(Scopes)}
            title={"Login"}
            showDialog={true}
            onAccessToken={(token) => getAndSetUser(token)}
          />
        </Card>
      </header>
    </>
  );
}

export default connect(null, mapDispatchToProps)(Login);

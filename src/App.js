import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import styled from 'styled-components';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Switch, Route } from 'wouter';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import Fav from './pages/Fav';
import Login from './pages/Login';
import FriendsSidebar from "./components/FriendsSidebar";
import { setUser } from './state/management/userSettings';

const Container = styled.div`
  background: ${p => p.theme.background};
  text-align: center;
  min-height: 100vh;
  color: ${p => p.theme.body};
`

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

function App({ user, ...props }) {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => { setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
  }, [Cookies.get('spotifyAuthToken')]);

  function getHashParams() {
    // Split so the part parsed is just ?code=adsf&state=asdf instead of http://localhost:3000/callback?code=asdf...
    // which makes the key the entire URL
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const username = urlParams.get('user') ?? "";
    const accessToken = urlParams.get('accessToken');
    
    if (accessToken) {
      Cookies.set('spotifyAuthToken', accessToken);
    }
    if (username !== "") {
      console.log('set user');
      setUser(username);
    }
    return { username, accessToken };
  }

  const { username, accessToken } = getHashParams();
  console.log('username', username, 'accesstoken', accessToken);

  return (
    <Container>
      <NavBar />
      <FriendsSidebar />
      <Switch>
        { spotifyAuthToken ? (
          <>
            <Route path='/profile'>{(_) => Profile()}</Route>
            <Route path='/fav'>{(_) => Fav()}</Route>
            <Route path='/insights'>{(_) => Insights()}</Route>
            <Route path='/'><Home token={spotifyAuthToken} /></Route>
          </>
        ) : (
          <>
            <Route path='/'>
              <Login />
            </Route>
          </>
        )}
        </Switch>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

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

const Container = styled.div`
  background: ${p => p.theme.background};
  text-align: center;
  min-height: 100vh;
  color: ${p => p.theme.body};
`

function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

function App({ user, ...props }) {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => { setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
  }, [Cookies.get('spotifyAuthToken')])

  return (
    <Container>
      <NavBar />
      <FriendsSidebar />
      <Switch>
        {user ? (
          <>
            <Route path='/profile'>{(_) => Profile()}</Route>
            <Route path='/fav'>{(_) => Fav()}</Route>
            <Route path='/insights'>{(_) => Insights()}</Route>
            <Route path='/'>{(_) => Home(spotifyAuthToken)}</Route>
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

export default connect(mapStateToProps, null)(App);

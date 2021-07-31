import { useEffect, useState } from 'react';
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
import { pullFriends } from './services';

const Container = styled.div`
  background: ${p => p.theme.background};
  text-align: center;
  min-height: 100vh;
  color: ${p => p.theme.body};
`

function App() {
  const [username, setUsername] = useState(Cookies.get('username') ?? "")
  const [spotifyId, setSpotifyId] = useState(Cookies.get('spotifyId') ?? "")

  useEffect(getHashParams, []);

  function getHashParams() {
    // Split so the part parsed is just ?code=adsf&state=asdf instead of http://localhost:3000/callback?code=asdf...
    // which makes the key the entire URL
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const username = urlParams.get('username') ?? "";
    const spotifyId = urlParams.get('spotifyId');

    if (spotifyId) {
      Cookies.set('spotifyId', spotifyId);
      setSpotifyId(spotifyId);
    }
    if (username !== "") {
      Cookies.set('username', username);
      setUsername(username);
    }
  }

  console.log('user', username, 'spotifyId', spotifyId);
  pullFriends(spotifyId);

  return (
    <Container>
      <NavBar />
      <FriendsSidebar spotifyId={spotifyId} />
      <Switch>
        {username && spotifyId ? (
          <>
            <Route path='/profile'>{(_) => Profile()}</Route>
            <Route path='/fav'>{(_) => Fav()}</Route>
            <Route path='/insights'>{<Insights username={username} spotifyId={spotifyId}/>}</Route>
            <Route path='/'><Home username={username} spotifyId={spotifyId}/></Route>
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

export default App;

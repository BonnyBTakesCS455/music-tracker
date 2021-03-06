import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "wouter";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import FriendsSidebar from "./components/FriendsSidebar";
import { pullFriends } from "./services";
import Recommendations from "./pages/Recommendations";
import FriendsInfo from "./pages/FriendsInfo";

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  color: ${(p) => p.theme.body};
`;

function App() {
  const [username, setUsername] = useState(Cookies.get("username") ?? "");
  const [spotifyId, setSpotifyId] = useState(Cookies.get("spotifyId") ?? "");

  useEffect(getHashParams, []);

  const logout = () => {
    Cookies.remove("spotifyId");
    Cookies.remove("username");
    setUsername("");
    setSpotifyId("");
  };

  function getHashParams() {
    // Split so the part parsed is just ?code=adsf&state=asdf instead of http://localhost:3000/callback?code=asdf...
    // which makes the key the entire URL
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const username = urlParams.get("username") ?? "";
    const spotifyId = urlParams.get("spotifyId");

    if (spotifyId) {
      Cookies.set("spotifyId", spotifyId);
      setSpotifyId(spotifyId);
    }
    if (username !== "") {
      Cookies.set("username", username);
      setUsername(username);
    }
  }

  pullFriends(spotifyId);

  return (
    <Container>
      {username && spotifyId ? (
        <>
          <NavBar />
          <FriendsSidebar spotifyId={spotifyId} />
          <Switch>
            <Route path="/friend/:id/name/:name">
              {(params) => {
                return (
                  <FriendsInfo spotifyId={params.id} username={params.name} />
                );
              }}
            </Route>
            <Route path="/profile">
              {(_) => {
                return <Profile logout={logout} />;
              }}
            </Route>
            <Route path="/recommendations">
              {(_) => {
                return (
                  <Recommendations username={username} spotifyId={spotifyId} />
                );
              }}
            </Route>
            <Route path="/insights">
              {(_) => {
                return <Insights username={username} spotifyId={spotifyId} />;
              }}
            </Route>
            <Route path="/">
              {(_) => {
                return <Home username={username} spotifyId={spotifyId} />;
              }}
            </Route>
            <Route>{(_) => NotFound()}</Route>
          </Switch>
        </>
      ) : (
        <Switch>
          <Route>
            <Login />
          </Route>
        </Switch>
      )}
    </Container>
  );
}

export default App;

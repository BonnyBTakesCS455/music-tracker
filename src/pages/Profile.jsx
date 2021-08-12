import React from "react";
import Settings from "../components/Settings";

function Profile({ logout }) {
  return (
    <React.Fragment>
      <header className="App-container">
        <Settings logout={logout} />
      </header>
    </React.Fragment>
  );
}

export default Profile;

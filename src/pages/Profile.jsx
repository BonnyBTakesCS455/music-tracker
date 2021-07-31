import React from 'react';
import Settings from '../components/Settings';

function Profile({logout}) {
  return (
    <React.Fragment>
      <header className='App-header'>
        <h1>The user profile page</h1>
        <Settings logout={logout}/>
      </header>
    </React.Fragment>
  );
}

export default Profile;
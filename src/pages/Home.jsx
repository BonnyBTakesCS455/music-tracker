import React from 'react';
import SongList from '../components/SongList';
import PageHeader from '../components/PageHeader';

function Home(token) {
  return (
    <React.Fragment>
      <header className='App-header'>
        <PageHeader title="Hello, Bonny B!" />
        <SongList token={token}/>
      </header>
    </React.Fragment>
  );
}

export default Home;

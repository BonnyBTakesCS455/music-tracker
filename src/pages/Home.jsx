import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import SongList from '../components/SongList';
import PageHeader from '../components/PageHeader';

function Home(props) {
  return (
    <React.Fragment>
      <header className='App-header'>
        <PageHeader title="Hello, Bonny B!" />
        <Card>
          <h4>Login</h4>
          <Button onClick={() => console.log('Clicked Login')}>Login</Button>
        </Card>

        <SongList />
      </header>
    </React.Fragment>
  );
}

export default Home;

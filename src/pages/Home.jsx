import React from 'react';
import SongList from '../components/SongList';
import PageHeader from '../components/PageHeader';
import { connect } from 'react-redux';

function Home({user, ...props}) {
  return (
    <React.Fragment>
      <header className='App-header'>
        <PageHeader title={`Hello ${user}!`} />
        <SongList token={props.token}/>
      </header>
    </React.Fragment>
  );
}


function mapStateToProps(state) {
  return {
    user: state.userSettings.user,
  };
}

export default connect(mapStateToProps, null)(Home);

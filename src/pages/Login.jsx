import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../state/management/userSettings'
import Button from '../components/Button';
import Card from '../components/Card';

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

function Login({ setUser }) {
  return (
    <>
      <header className='App-header'>
        <Card>
          <h4>Login</h4>
          <Button onClick={() => setUser({ email: 'bonny@b.com' })}>Login</Button>
        </Card>
      </header>
    </>
  );
}

export default connect(null, mapDispatchToProps)(Login);

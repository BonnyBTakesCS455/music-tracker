import { connect } from 'react-redux'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Switch, Route } from 'wouter';
import Graph from './pages/Graph';
import Profile from './pages/Profile';
import Fav from './pages/Fav';
import Login from './pages/Login';
import Settings from './pages/Settings';

function mapStateToProps(state) {
  return {
    user: state.userSettings.user
  }
}

function App({ user, ...props }) {
  return (
    <div className='App'>
      <NavBar />
      <Switch>
      {
        user ?
        <>
          <Route path='/profile'>{(_) => Profile()}</Route>
          <Route path='/fav'>{(_) => Fav()}</Route>
          <Route path='/graph'>{(_) => Graph()}</Route>
          <Route path='/settings'><Settings /></Route>
          <Route path='/'>{(_) => Home()}</Route>
        </>
        :
        <>
          <Route path='/'><Login /></Route>
        </>
      }
        </Switch>
      
    </div>
  );
}

export default connect(mapStateToProps, null)(App);

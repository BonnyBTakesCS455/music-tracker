import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Switch, Route } from 'wouter';
import Graph from './pages/Graph';
import Profile from './pages/Profile';
import Fav from './pages/Fav';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Switch>
        <Route path='/profile'>{(_) => Profile()}</Route>
        <Route path='/fav'>{(_) => Fav()}</Route>
        <Route path='/graph'>{(_) => Graph()}</Route>
        <Route path='/'>{(_) => Home()}</Route>
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import Button from './components/Button'
import Card from './components/Card'
import SongList from './components/SongList';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Card>
          <h4>Login</h4>
          <Button onClick={() => console.log('Clicked Login')}>Login</Button>
        </Card>
        
        <SongList />
      </header>
    </div>
  );
}

export default App;

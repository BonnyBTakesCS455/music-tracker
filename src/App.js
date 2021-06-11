import './App.css';
import Button from './components/Button'
import SongList from './components/SongList';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Button onClick={() => console.log('Clicked Login')}>Login</Button>
        <SongList />
      </header>
    </div>
  );
}

export default App;

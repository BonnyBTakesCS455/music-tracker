import './App.css';
import Button from './components/Button'
import SongList from './components/SongList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => console.log('Clicked Login')}>Login</Button>
        <SongList />
      </header>
    </div>
  );
}

export default App;

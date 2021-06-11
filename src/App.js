import './App.css';
import Button from './components/Button'
import Card from './components/Card'
import SongList from './components/SongList';

function App() {
  return (
    <div className="App">
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

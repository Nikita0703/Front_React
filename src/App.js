import logo from './logo.svg';
import './App.css';
import Employee from'./components/Employee'
import Appbar from './components/Appbar';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Employee/>
    </div>
  );
}

export default App;

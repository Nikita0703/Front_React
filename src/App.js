import logo from './logo.svg';
import './App.css';
import Employee from'./components/Employee'
import Appbar from './components/Appbar';
import AddUser  from'./components/AddUser'
import ViewUser  from'./components/ViewUser'
import EditUser  from'./components/EditUser'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
      <Appbar/>
       
      <Routes>
        <Route exact path = "/editemployee/:id" element = {<EditUser/>}/> 
        <Route exact path = "/" element = {<Employee/>}/>
        <Route exact path = "/addUser" element = {<AddUser/>}/>
        <Route exact path = "/viewUser" element = {<ViewUser/>}/>
        <Route exact path = "/viewemployee/:id" element = {<ViewUser/>}/>

      </Routes>
       
      </Router>
      
    </div>
  );
}

export default App;

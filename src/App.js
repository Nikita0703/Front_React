import logo from './logo.svg';
import './App.css';
import Employee from'./components/Employee'
import Appbar from './components/Appbar';
import AddUser  from'./components/AddUser'
import ViewUser  from'./components/ViewUser'
import EditUser  from'./components/EditUser'
import Login from './components/Login'
import Register from './components/Register'
import EventBus from './common/EventBus'
import AuthService from "./services/AuthService";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
 


  const [currentUser, setCurrentUser] = useState({
    name: '',
    surname: '',
    salary: 0 ,
    department:'',
    car: {
      model: '',
      year: ''
    },
    house: {
        adress: '',
        flour: 0,
        flat:0
      },
    pets:[],
    projects:[]  
    });
 

 const componentDidMount=() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

 const componentWillUnmount=() => {
    EventBus.remove("logout");
  }

  const logOut = () => {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }
 
  return (
    <div className="App">
      <Router>
      <Appbar/>
       
      <Routes>

        <Route exact path = "/editemployee/:id" element = {<EditUser/>}/> 
        <Route exact path = "/all" element = {<Employee/>}/>
        <Route exact path = "/addUser" element = {<AddUser/>}/>
        <Route exact path = "/viewUser" element = {<ViewUser/>}/>
        <Route exact path = "/viewemployee/:id" element = {<ViewUser/>}/>
        <Route exact path = "/" element = {<Login/>}/>
        <Route exact path = "/register" element = {<Register/>}/>
        
      </Routes>
       
      </Router>
      
    </div>
  );
}

export default App;

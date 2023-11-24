import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Employee.css'
import { useParams } from 'react-router-dom';

export default function ViewUser() {
    const {id} = useParams()

    const [employee, setEmployee] = useState({
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
        }
        )


        useEffect(()=>{
            axios.get(`http://localhost:8080/api1/employees/${id}`)
            .then(response=>
                setEmployee(response.data)
            )
        },[])
        
        
    const [name,setName]=useState('')
    const [surname,setSurname]=useState('')
    const[salary,setSalary]=useState(0)
    const [department,setDepartment]=useState('')

    const [idi,setId]=useState(0)

    const [model,setModel]=useState('')
    const [made,setMade]=useState(0)
   

    const [adress,setAdress]=useState('')
    const [flour,setFlour]=useState(0)
    const [flat,setFlat]=useState(0)
    
    const [vid,setVid]=useState('')
    const [petname,setPetname]=useState('')
    
    const [title,setTitle]=useState('')
    const [year,setYear]=useState(0)

    const[pets,setPets]=useState([])
    const[employees,setEmployees]=useState([])
    const[projects,setProjects]=useState([])

    
      
    return (
        <Container>
        <Paper className='employee-paper-output' elevation = {6} key = {employee.id}>
            id:{employee.id} <br/>
            Name:{employee.name} <br/>
            Surname:{employee.surname} <br/>
            Salary:{employee.salary} <br/>
            Department:{employee.department} <br/>
            <h3>Car</h3>
           
            
           < Paper className='employee-paper-output' elevation = {6} key = {employee.car.id}>
                id:{employee.car.id} <br/>
                Model:{employee.car.model} <br/>
                Year:{employee.car.made}<br/>
                </Paper>

                <h3>House</h3>
           
            
           < Paper className='employee-paper-output' elevation = {6}  key = {employee.house.id}>
                id:{employee.house.id} <br/>
                Adress:{employee.house.adress} <br/>
                Flour:{employee.house.flour} <br/>
                Flat:{employee.house.flat}<br/>
                </Paper>
                
                <h3>Pets</h3>
           {employee.pets.map(pet=>(
                <Paper className='employee-paper-output' elevation = {6}  key = {pet.id}>
                id:{pet.id} <br/>
                title:{pet.vid} <br/>
                petname:{pet.petname}<br/>
                </Paper>
            ))}
                
                <h3>Projects</h3>
           {employee.projects.map(project=>(
                <Paper className='employee-paper-output' elevation = {6} key = {project.id}>
                id:{project.id} <br/>
                title:{project.title} <br/>
                year:{project.year}<br/>
                </Paper>
            ))}
 </Paper>
 </Container>
    ); 
}
 
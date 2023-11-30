import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Employee.css'
import AuthService from "../services/AuthService";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    let navigate = useNavigate()

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    
    const [name,setName]=useState('')
    const [surname,setSurname]=useState('')
    const[salary,setSalary]=useState(0)
    const [department,setDepartment]=useState('')

    const [id,setId]=useState(0)

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


    const handleClick=(e)=>{
        e.preventDefault()
        const car = {model,made}
        const house = {adress,flour,flat}
        const employee = {username,password,name,surname,salary,department,car,house,pets,projects}
        console.log(employee)
        AuthService.register(
            employee         
            ).then(()=>{
            console.log("New student added")
            navigate("/")
        })
        
        
    }
  
    const addProject=(e)=>{
        const project = {title,year}
        console.log(project)
       
        setProjects([...projects, project]);

    }

    const addPet=(e)=>{
        const pet = {vid,petname}
        console.log(pet)
       
        setPets([...pets, pet]);

    }
    return (
        <Container>
        <Paper className='employee-paper' elevation={3}>
        <Box className='box-style'
            component="form"
            noValidate
            autoComplete="off"
            id = "root"
        >
            <h1>Add employee</h1>

            <TextField  className='field 'fullWidth id="fildName" label="Username" variant="outlined" 
               value = {username}
               onChange={(e)=>setUsername(e.target.value)}
            />

            <TextField className='field' fullWidth id="fildSurname" label="password" variant="outlined" 
               value = {password}
               onChange={(e)=>setPassword(e.target.value)}
            />

            <TextField  className='field 'fullWidth id="fildName" label="Name" variant="outlined" 
               value = {name}
               onChange={(e)=>setName(e.target.value)}
            />

            <TextField className='field' fullWidth id="fildSurname" label="Surname" variant="outlined" 
               value = {surname}
               onChange={(e)=>setSurname(e.target.value)}
            />

            <TextField className='field 'fullWidth id="fildSalary" label="Salary"  variant="outlined"  
               value = {salary}
               onChange={(e)=>
                setSalary(parseInt(e.target.value))
            }
            />

            <TextField className='field 'fullWidth id="fildDepartment" label="Department"  variant="outlined"  
               value = {department}
               onChange={(e)=>setDepartment(e.target.value)}
            />
            <h2>Car</h2>

         <TextField className='field 'fullWidth id="fildTitle" label="model"  variant="outlined"  
             value = {model}
               onChange={(e)=>setModel(e.target.value)}
         />

         <TextField className='field' fullWidth id="year" label="year"  variant="outlined" 
             value = {made}
             onChange={(e)=>
                   setMade(parseInt(e.target.value))
         } 
         />

<h2>House</h2>

<TextField className='field' fullWidth id="fildTitle" label="Adress"  variant="outlined" 
    value = {adress}
      onChange={(e)=>setAdress(e.target.value)}
/>

<TextField className='field' fullWidth id="year" label="flour"  variant="outlined" 
    value = {flour}
    onChange={(e)=>
          setFlour(parseInt(e.target.value))
} 
/>

<TextField className='field' fullWidth id="year" label="flat"  variant="outlined"  
    value = {flat}
    onChange={(e)=>
          setFlat(parseInt(e.target.value))
} 
/>

<h2>Pets</h2>

<TextField className='field' fullWidth id="fildTitle" label="vid"  variant="outlined"  
    value = {vid}
    onChange={(e)=>setVid(e.target.value)}
 />

<TextField className='field' fullWidth id="year" label="petname"  variant="outlined"  
    value = {petname}
    onChange={(e)=>
     setPetname(e.target.value)
 } 
/>

<Button variant="contained" onClick = {addPet}>
     addPet </Button>   
           
           <h2>Projects</h2>

           <TextField className='field' fullWidth id="fildTitle" label="title"  variant="outlined"  
               value = {title}
               onChange={(e)=>setTitle(e.target.value)}
            />

           <TextField className='field' fullWidth id="year" label="year"  variant="outlined"  
               value = {year}
               onChange={(e)=>
                setYear(parseInt(e.target.value))
            } 
           />

           <Button variant="contained" onClick = {addProject}>
                addProject  </Button>
            
            <Button variant="contained" onClick = {handleClick}>
                Submit  </Button>

          
        </Box>
        </Paper> 
        </Container>
  );
}
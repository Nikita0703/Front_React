import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Employee.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AddUser() {
    let navigate = useNavigate()
    const {id} = useParams()

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
            .then(response=>{
                setEmployee(response.data)
                setId(response.data.id)
                setName(response.data.name)
                setSurname(response.data.surname)
                setSalary(response.data.salary)
                setDepartment(response.data.department)
                setModel(response.data.car.model)
                setMade(response.data.car.made)
                setAdress(response.data.house.adress)
                setFlour(response.data.house.flour)
                setFlat(response.data.house.flat) 
                setPets(response.data.pets) 
                setProjects(response.data.projects) 
            }
            )
        },[])



    const handleClick=(e)=>{
        const car = {model,made}
        const house = {adress,flour,flat}
        
        const employee1 = {id,name,surname,salary,department,car,house,pets,projects}
        axios.put("http://localhost:8080/api1/employees", employee1)
         .then(response => {
            console.log(response)
            navigate("/")
        })
         .catch(error => console.error(error))
        
        
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

    const PetDelete = (id) => {
        
        axios.delete(`http://localhost:8080/api1/pets/${id}`)
          .then(response => console.log(response))
          .catch(error => console.error(error))

          const updatedPets = pets.filter(pet => pet.id !== id);
          setPets(updatedPets);
      }

      const ProjectDelete = (id) => {
        
       axios.delete(`http://localhost:8080/api1/projects/${id}`)
          .then(response => console.log(response))
          .catch(error => console.error(error))
          console.log(id)
          const updatedProjects = projects.filter(project => project.id !== id);
          setProjects(updatedProjects);
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

<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {pets.map((pet, index) => (
           <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField label="id" 
                    value={pet.id} onChange={(e) => {
                    const newPets = [...pets]
                    newPets[index].id = e.target.value
                    setPets(newPets)
                }} />
                <TextField label="vid" 
                    value={pet.vid} onChange={(e) => {
                    const newPets = [...pets]
                    newPets[index].vid = e.target.value
                    setPets(newPets)
                }} />
                <TextField label="name" 
                    value={pet.petname} onChange={(e) => {
                    const newPets = [...pets]
                    newPets[index].petname = e.target.value
                    setPets(newPets)
                }} />
                <Button variant="contained" onClick = {addProject}>
                       UpdatePet </Button>

               <Button variant="contained" onClick = {() => PetDelete(pet.id)}>
                     DeletePet  </Button>
                </Box>
        ))}
    </Box>
    
    
    <h2>Projects</h2>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {projects.map((project, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField label= "id" 
                value={project.id} onChange={(e) => {
                    const newProjects = [...projects]
                    newProjects[index].id = e.target.value
                    setProjects(newProjects)
                }} />
                <TextField label= "title" 
                value={project.title} onChange={(e) => {
                    const newProjects = [...projects]
                    newProjects[index].title = e.target.value
                    setProjects(newProjects)
                }} />
                <TextField label="year" 
                value={project.year} onChange={(e) => {
                    const newProjects = [...projects]
                    newProjects[index].year = e.target.value
                    setProjects(newProjects)
                }} />
                 <Button variant="contained" onClick = {addProject}>
                       UpdateProject </Button>

               <Button variant="contained" onClick = {() => ProjectDelete(project.id)}>
                     DeleteProject </Button>
    
            </Box>
        ))}
    </Box>


<h2>AddPet</h2>

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
           
           <h2>AddProject</h2>

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
                Update  </Button>

                
        </Box>
        </Paper> 
        </Container>
  );
}
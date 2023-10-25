import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Employee.css'

export default function Employee() {
    const paperStyle={}
   

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


    const handleClick=(e)=>{
        e.preventDefault()
        const car = {model,made}
        const house = {adress,flour,flat}
        const employee = {name,surname,salary,department,car,house,pets,projects}
        console.log(employee)
        axios.post("http://localhost:8080/api1/employees",
            employee,{
            headers:{"Contend-Type":"application/json",
                    "charset":"ISO-8859-1"
        }
            
            }).then(()=>{
            console.log("New student added")
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

    const addCar=(e)=>{
        const newcar = {model,made}
        console.log(newcar)

    }

   const UpdateClick=(e)=>{
      const car = {model,made}
      const house = {adress,flour,flat}
      
      const employee1 = {id,name,surname,salary,department,car,house,pets,projects}
      console.log(employee1)
      axios.put("http://localhost:8080/api1/employees", employee1)
       .then(response => console.log(response))
       .catch(error => console.error(error))
      window.location.reload()
   }

    async function handleClickUpdate  (idi) {
        
        const employee = employees.find(emp => emp.id === idi);
        
        setId(idi)

        setName(employee.name)
        setSurname(employee.surname)
        setSalary(employee.salary)
        setDepartment(employee.department)
        
       setModel(employee.car.model)
       setMade(employee.car.made)

        setAdress(employee.house.adress)
        setFlour(employee.house.flour)
        setFlat(employee.house.flat)

    }



    const handleEmployeeDelete = (id) => {
        
        axios.delete(`http://localhost:8080/api1/employees/${id}`)
          .then(response => console.log(response))
          .catch(error => console.error(error))
          window.location.reload()
      }
    
    
    useEffect(()=>{
        axios.get("http://localhost:8080/api1/employees")
        .then(response=>
            setEmployees(response.data)
        )
    },[])

    function waitForUpdate() {
        return new Promise(resolve => {
          const updateButton = document.getElementById('buttonUpdate');
          updateButton.addEventListener('click', () => {
            resolve();
          });
        });
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

            <Button id="buttonUpdate" variant="contained" onClick={UpdateClick}>
                Update </Button>
        </Box>
        </Paper> 

        <h1>Employees</h1>

        <Paper className='employee-paper' elevation={3}>

        {employees.map(employee=>(
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

            <Button variant="contained" onClick = {()=>handleClickUpdate(employee.id)}>
                Update  </Button> 
                <span>   </span>
                <Button variant="contained" onClick = {() => handleEmployeeDelete(employee.id)} >
                delete  </Button>    
        </Paper>
        ))
}
      </Paper>

      </Container>
    );
}

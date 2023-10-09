import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';

export default function Employee() {
    const paperStyle={padding:'10px 10px 100px 10px',width:600,margin:"20px auto"}

    const [name,setName]=useState('')
    const [surname,setSurname]=useState('')
    const[salary,setSalary]=useState(0);
    const [department,setDepartment]=useState('')
    const [id,setId]=useState(0)

    const[employees,setEmployees]=useState([])


    const handleClick=(e)=>{
        e.preventDefault()
        const employee = {name,surname,salary,department}
        console.log(employee)
        axios.post("http://localhost:8080/api/employees",
            employee,{
            headers:{"Contend-Type":"application/json"}
            

       }).then(()=>{
            console.log("New student added")
        })
        
        window.location.reload()
    }

   const UpdateClick=(e)=>{
    //await waitForUpdate();

      //console.log(name)
      const employee1 = {id,name,surname,salary,department}
      console.log(employee1)
      axios.put("http://localhost:8080/api/employees", employee1)
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
        

        //await waitForUpdate();

        //console.log(name)
        //const employee1 = {id,name,surname,salary,department}
//console.log(employee1)
       // axios.put("http://localhost:8080/api/employees", employee1)
          // .then(response => console.log(response))
          // .catch(error => console.error(error))

        ///window.location.reload()
    }



    const handleEmployeeDelete = (id) => {
        
        axios.delete(`http://localhost:8080/api/employees/${id}`)
          .then(response => console.log(response))
          .catch(error => console.error(error))
          window.location.reload()
      }
    
    
    useEffect(()=>{
        axios.get("http://localhost:8080/api/employees")
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
        <Paper elevation={3} style={paperStyle}>
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            noValidate
            autoComplete="off"
            id = "root"
        >
            <h1>Add employee</h1>

            <TextField fullWidth id="fildName" label="Name" variant="outlined"  sx={{ display: "block" }}
               value = {name}
               onChange={(e)=>setName(e.target.value)}
            />

            <TextField fullWidth id="fildSurname" label="Surname" variant="outlined" sx={{ display: "block" }}
               value = {surname}
               onChange={(e)=>setSurname(e.target.value)}
            />

            <TextField fullWidth id="fildSalary" label="Salary"  variant="outlined"  sx={{ display: "block" }}
               value = {salary}
               onChange={(e)=>
                setSalary(parseInt(e.target.value))
            }
            />

            <TextField fullWidth id="fildDepartment" label="Department"  variant="outlined"  sx={{ display: "block" }}
               value = {department}
               onChange={(e)=>setDepartment(e.target.value)}
            />

            <Button variant="contained" onClick = {handleClick}>
                Submit  </Button>

            <Button id="buttonUpdate" variant="contained" onClick={UpdateClick}>
                Update </Button>
        </Box>
        </Paper> 

        <h1>Employees</h1>

        <Paper elevation={3} style={paperStyle}>

        {employees.map(employee=>(
            <Paper elevation = {6} style = {{margin:"10px",padding:"15px",textAlign:"left"}} key = {employee.id}>
            id:{employee.id} <br/>
            Name:{employee.name} <br/>
            Surname:{employee.surname} <br/>
            Salary:{employee.salary} <br/>
            Department:{employee.department} <br/>
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

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import './Employee.css'
import {Link} from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
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

     function handleClickUpdate  (idi) {
        
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

          const updatedEmployees = employees.filter(employee => employee.id !== id);
          setEmployees(updatedEmployees);
      }
    
    
    useEffect(()=>{
        axios.get("http://localhost:8080/api1/employees")
        .then(response=>
            setEmployees(response.data)
        )
    },[])



    return (
     <Container>
        <Link className = "btn btn-toggler-icon" to = "addUser">AddUser</Link>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                 <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.surname}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                   <Link variant="text" to = {`/viewemployee/${employee.id}`}>View </Link><br/>
                   <br/>
                   <Link variant="text" to = {`/editemployee/${employee.id}`}>Edit </Link><br/>
                   <br/>
                   <Button variant="outlined" onClick = {() => handleEmployeeDelete(employee.id)}> Delete</Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     </Container>
    );
}

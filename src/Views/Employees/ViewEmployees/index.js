/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
import NavBar from '../../../Components/NavBar/index.js'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])
  let [employees, setEmployees] = useState([])
  const getEmployees = async () => {
    try {
      let response = await fetch('http://127.0.0.1:1313/viewEmployees',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      let result = await response.json();
      setEmployees(result.Empleado)
    }
    catch (err) {

    }
  }

  const handlerUpdate = async (event, params) => {
    let data = {
      id: params
    }
    let response = await fetch('http://127.0.0.1:1313/updateStateEmployees',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    let result = await response.json();

    if(result.data) {
      Swal.fire(
        'Correcto',
        'Estado del empleador actualizado',
        'success'
      )
    }

  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    const jwt = localStorage.getItem("jwt");
    if (!jwt ) {
      Swal.fire(
        'Error',
        'Inicio de sesión expirado',
        'error'
      ).then(() => {
        return navigate('/login')
      })
    }
  }, [])

  useEffect(() => {
    getEmployees()
  })

  return (
    <div>
      <NavBar/>
      <Container>
      <h1 className="header">Visualizar empleados</h1>
      <Table striped bordered hover style={{ marginTop: 20 , textAlign:'center'}} responsive="md">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Cargo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((items) => {
              return (
                <tr key={items.ID_EMPLEADO}>
                  <td> {items.NOMBRES} </td>
                  <td> {items.APELLIDOS} </td>
                  <td> {items.CORREO} </td>
                  <td> {items.TELEFONO} </td>
                  <td> {items.CARGO} </td>
                  <td> 
                    {
                      items.ESTADO === 'Disponible' ? 
                      <FcOk style={{width:25 , height:25 }}/> : 
                      <FcCancel style={{width:25 , height:25}}/>
                    } 
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={event => handlerUpdate(event, items.ID_EMPLEADO)}>
                      Cambiar Estado
                    </Button>
                  </td>
                </tr>

              )
            })
          }
        </tbody>
      </Table>
      </Container>
    </div>
  )
}

export default Home
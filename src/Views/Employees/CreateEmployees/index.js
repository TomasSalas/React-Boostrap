/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
import NavBar2 from '../../../Components/NavBar/index2.js'
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


function Link() {
  
  const { register, handleSubmit, reset,  formState: { errors } } = useForm();
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])

  const onSubmit = async (data) => {
    let response = await fetch('http://127.0.0.1:1313/addEmployees',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    let result = await response.json();
    if(result === "OK"){
      Swal.fire(
        'Correcto',
        'Ingreso de Personal Correcto',
        'success'
      )
      reset()
    }else if (result === "ER_DUP_ENTRY"){
      Swal.fire(
        'Error',
        'Personal con correo ya existente',
        'warning'
      )
    }
  }
  const [cargo , setCargo] = useState([])
  const selectCargo = async () => {
    try {
      let response = await fetch('http://127.0.0.1:1313/getCargo',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      
      let result = await response.json();
      setCargo(result.Cargo)
    }
    catch (err) {

    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    const jwt = localStorage.getItem("jwt");
    const decoded = jwt_decode(jwt);
    const currentTime = Math.round(new Date().getTime()/1000) // tiempo actual en epoch 

    if (jwt) {
      if (currentTime > decoded.exp) {
        Swal.fire(
          'Error',
          'Inicio de sesión expirado',
          'error'
        ).then(() => {
          return navigate('/login')
        })
      }
      
    }
    selectCargo()
  }, [])
  return (
    <div>
      <NavBar2/>
      <Container>
      <h1 className="header">Crear empleados</h1>
        <Form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Nombres" 
              {
                ...register("Nombre" , {required: true})
              }
            />
            {
              errors.Nombre?.type === 'required' && 
              <p role="alert" style={{color:"red" ,fontWeight: 'bold' , marginTop: 10}}>
                El campo nombres es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Apellidos" 
              {
                ...register("Apellidos" , {required: true})
              }
            />
            {
              errors.Apellidos?.type === 'required' && 
              <p role="alert" style={{color:"red" ,fontWeight: 'bold' , marginTop: 10}}>
                El campo apellidos es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              type="email" 
              placeholder="Correo Electronico" 
              {
                ...register("Correo" , {required: true})
              }
            />
            {
              errors.Correo?.type === 'required' && 
              <p role="alert" style={{color:"red" ,fontWeight: 'bold' , marginTop: 10}}>
                El campo correo electronico es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Telefono (+569)" 
              {
                ...register("Telefono" , {required: true})
              }
            />
            {
              errors.Telefono?.type === 'required' && 
              <p role="alert" style={{color:"red" ,fontWeight: 'bold' , marginTop: 10}}>
                El campo telefono es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select {...register("Cargo" , {required: "select one option"})}>
              <option value="">Seleccione Cargo</option>
              { cargo.map((items , index) => {
                return (
                  <option key={index} value={items.ID_CARGO}>{items.NOMBRE}</option>
                )
              })}
            </Form.Select>
            {
              errors.Cargo?.type === 'required' && 
              <p role="alert" style={{color:"red" ,fontWeight: 'bold' , marginTop: 10}}>
                El campo cargo debe ser seleccionado
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Link
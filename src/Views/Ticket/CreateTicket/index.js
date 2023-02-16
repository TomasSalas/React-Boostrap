/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */

import NavBar from '../../../Components/NavBar/index.js'
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function addTicket() {
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    let response = await fetch('http://127.0.0.1:1313/addTicket',
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
        'Ingreso de ticket Correcto',
        'success'
      )
    }
    reset()
  }
  const [empleado, setEmpleado] = useState([])
  const [estado, setEstado] = useState([])


  const selectEmployees = async () => {
    try {
      let response = await fetch('http://127.0.0.1:1313/viewEmployeesCheck',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      let result = await response.json();
      setEmpleado(result.Empleado)
    }
    catch (err) {

    }
  }

  const selectEstado = async () => {
    try {
      let response = await fetch('http://127.0.0.1:1313/getEstadoTicket',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      let result = await response.json();
      setEstado(result.EstadoTicket)
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
  }, [])

  useEffect(() => {
    selectEmployees()
    selectEstado()
  })
  return (
    <div>
      <NavBar />
      <Container>
      <h1 className="header">Crear tickets</h1>
        <Form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre Tarea"
              {
              ...register("Nombre", { required: true })
              }
            />
            {
              errors.Nombre?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo nombre tarea es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Descripción"
              {
              ...register("Descripcion", { required: true })
              }
            />
            {
              errors.Descriocion?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo descripción es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label > Fecha Inicio </Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha Inicio"
              {
              ...register("FechaInicio", { required: true })
              }
            />
            {
              errors.FechaInicio?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo fecha inicio es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label > Fecha Termino </Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha Termino"
              {
              ...register("FechaTermino", { required: true })
              }
            />
            {
              errors.FechaTermino?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo fecha termino es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select {...register("Empleado", { required: "select one option" })}>
              <option value="">Seleccione Empleado</option>
              {empleado.map((items, index) => {
                return (
                  <option key={index} value={items.ID_EMPLEADO}>{items.NOMBRE}</option>
                )
              })}
            </Form.Select>
            {
              errors.Empleado?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo cargo debe ser seleccionado
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select {...register("Estado", { required: "select one option" })}>
              <option value="">Seleccione Estado</option>
              {estado.map((items, index) => {
                return (
                  <option key={index} value={items.ID_ESTADO}>{items.NOMBRE}</option>
                )
              })}
            </Form.Select>
            {
              errors.Estado?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo estado debe ser seleccionado
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

export default addTicket
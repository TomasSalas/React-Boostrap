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
import jwt_decode from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';

function Home() {
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])
  const [ userUpdate , setUserUpdate ] = useState([])
  const [cargo, setCargo] = useState([])

  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue ,  reset,  formState: { errors } } = useForm();
  const handleClose = () => setShow(false);

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
    let response = await fetch('backticket-production.up.railway.app/updateStateEmployees',
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
      setShow(false)
    }

  }

  const handleShow = async (event, params) => {
    setShow(true)
    setValue("idEmpleado" , params.ID_EMPLEADO)
    setValue("nombre" , params.NOMBRES)
    setValue("apellido" , params.APELLIDOS)
    setValue("correo" , params.CORREO)
    setValue("correo" , params.CORREO)
    setValue("telefono" , params.TELEFONO)
    setValue("estado" , params.ESTADO)
    setUserUpdate(params)
  };

  const onSubmit = async (data) => {
    let response = await fetch('backticket-production.up.railway.app/updateEmployees',
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
        'Empleador actualizado',
        'success'
      ).then(() => {
        setShow(false)
      })
    }
    
  }

  const selectEstado = async () => {
    try {
      let response = await fetch('backticket-production.up.railway.app/getCargo',
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
  }, [])

  useEffect(() => {
    getEmployees()
    selectEstado()
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

                    <Button
                      variant="success"
                      onClick={event => handleShow(event , items)}>
                      Editar Empleado
                    </Button>
                  </td>
                </tr>

              )
            })
          }
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Editar Empleado

          <Form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="ID EMPLEADO"
                {
                ...register("idEmpleado")
                
                }
                disabled
              />
              {
                errors.idEmpleado?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo id empleado es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="NOMBRE"
                {
                ...register("nombre")
                
                }
              />
              {
                errors.nombre?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo nombre es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="APELLIDO"
                {
                ...register("apellido")
                
                }
              />
              {
                errors.apellido?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo apellido es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="CORREO"
                {
                ...register("correo")
                
                }
              />
              {
                errors.correo?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo correo es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="TELEFONO"
                {
                ...register("telefono")
                
                }
              />
              {
                errors.telefono?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo telefono es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="ESTADO"
                {
                ...register("estado")
                
                }
                disabled
              />
              {
                errors.estado?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo estado es requerido
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select {...register("cargo", { required: "select one option" })}>
                <option value="">Seleccione Cargo</option>
                {cargo.map((items, index) => {
                  return (
                    <option key={index} value={items.ID_CARGO}>{items.NOMBRE}</option>
                  )
                })}
              </Form.Select>
              {
                errors.cargo?.type === 'required' &&
                <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                  El campo estado debe ser seleccionado
                </p>
              }
            </Form.Group>

            <Form.Group className="mb-3">
              <Button variant="warning" type="submit">
                Editar empleado
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      </Container>
    </div>
  )
}

export default Home
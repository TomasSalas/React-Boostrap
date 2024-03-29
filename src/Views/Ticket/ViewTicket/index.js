/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */

import NavBar from '../../../Components/NavBar/index.js'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FcSettings } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";



function ViewTicket() {
  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  let [ticket, setTicket] = useState([])
  const [estado, setEstado] = useState([])
  const [show, setShow] = useState(false);
  let date = new Date()
  let day = `${(date.getDate())}`.padStart(2, '0');
  let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
  let year = date.getFullYear();

  let dateNew = (`${day}-${month}-${year}`)
  let jwt = localStorage.getItem("jwt");

  const handleClose = () => setShow(false);
  const handleShow = async (event, params) => {
    setShow(true)
    setValue("idTicket", params)
  };

  const getTickets = async () => {
    try 
    {
      let response = await fetch('https://backticket-production.up.railway.app/viewTicket')
      let result = await response.json();
      setTicket(result.Tickets)
    }
    catch (err) {

    }
  }

  const selectEstado = async () => {
    try {
      let response = await fetch('https://backticket-production.up.railway.app/getEstadoTicket',
        {
          method: 'GET',
        }
      )

      let result = await response.json();
      setEstado(result.EstadoTicket)
    }
    catch (err) {
      // Swal.fire(
      //   'Error',
      //   'Error' + err.message,
      //   'error'
      // )
    }
  }

  const onSubmit = async (data) => {
    let response = await fetch('https://backticket-production.up.railway.app/updateStateTicket',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    let result = await response.json();
    if (result) {
      Swal.fire(
        'Correcto',
        'Estado cambiado correctamente',
        'success'
      )
    }
    reset()
    setShow(false)
  }
  useEffect(() => {
    if(jwt != null){
      const decoded = jwt_decode(jwt);
      setUser(JSON.parse(localStorage.getItem("user")));
      const currentTime = Math.round(new Date().getTime()/1000) // tiempo actual en epoch 
      
      if (currentTime > decoded.exp) {
        Swal.fire(
          'Error',
          'Inicio de sesión expirado',
          'error'
        ).then(() => {
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          return navigate('/login')
        })
      }
    }else{
      return navigate('/login')
    }
  }, [])
  useEffect(() => {
    getTickets()
    selectEstado()
  })
  return (
    <div>
      <NavBar />
      <Container>
        <h1 className="header">Visualizar tickets</h1>
        <Table striped bordered hover style={{ marginTop: 20, textAlign: 'center' }} responsive="md">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Fecha Inicio</th>
              <th>Fecha Termino</th>
              <th>Empleado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              ticket.map((items) => {
                return (
                  <tr key={items.ID_TICKET}>
                    <td> {items.ID_TICKET} </td>
                    <td> {items.NOM_TAREA} </td>
                    <td> {items.DESCRIPCION} </td>
                    <td style={{ color: "green" }}> {items.FECHA_INICIO} </td>
                    {
                      items.FECHA_TERMINO <= date ?
                        <td style={{ color: "red" }}>
                          {
                            items.FECHA_TERMINO
                          }
                        </td> :
                        <td style={{ color: "green" }}>
                          {
                            items.FECHA_TERMINO
                          }
                        </td>
                    }
                    <td> {items.EMPLEADO} </td>
                    <td>
                      {
                        items.NOMBRE === 'Designada' ? <FcPortraitMode style={{ width: 25, height: 25 }} /> :
                          items.NOMBRE === 'En Desarrollo' ? <FcSettings style={{ width: 25, height: 25 }} /> :
                            <FcOk style={{ width: 25, height: 25 }} />
                      }
                    </td>
                    <td>
                      <Button variant="warning" onClick={event => handleShow(event, items.ID_TICKET)}>
                        Cambiar Estado
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
            <Modal.Title>Cambio de estado Tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Selecciona un estado
            <Form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Ticket"
                  {
                  ...register("idTicket")

                  }
                  disabled
                />
                {
                  errors.Nombre?.type === 'required' &&
                  <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                    El campo nombre tarea es requerido
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
              <Button variant="primary" type="submit">
                Cambiar el estado
              </Button>
              <Form.Group>

              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>


    </div>
  )
}

export default ViewTicket
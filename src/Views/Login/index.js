/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import React, { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const jwt = localStorage.getItem("jwt")

  const onSubmit = async (data) => {
    try {
      let response = await fetch('https://backticket-production.up.railway.app/signin',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      let result = await response.json();
      if (result.error === null) {
        Swal.fire(
          'Correcto',
          'Ingreso Correcto',
          'success'
        ).then(() => {
          localStorage.setItem("jwt", result.loginMatch.token);
          localStorage.setItem("user", JSON.stringify(result.loginMatch.user));

          navigate('/index')
        })
      } else {
        Swal.fire(
          'Error',
          'Correo o contraseña ingresados son incorrectos',
          'error'
        )
      }

    } catch (err) {
      Swal.fire(
        'Error',
        'Error: ' + err.message,
        'error'
      )
    }
  }

  const verifyLogin = async () => {
    
    if(jwt){
      return navigate('/index')
    }else{
      return navigate('/login')
    }
  }
  useEffect(() => {
    verifyLogin()
  } , [])
  return (
    <div
      style={{
        "height": "100vh",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "background": "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(84,84,116,1) 59%, rgba(0,212,255,1) 100%)",
      }}
    >

      <Container style={{ width: 500 }}>
        <Container className="text-center">
          <h2 className="mb-2 text-uppercase text-white">Login</h2>
          <p className="mb-2 text-uppercase text-white"> Ingresa tu correo y contraseña para acceder </p>
        </Container>
        <Form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo Electronico"
              {
              ...register("email", { required: true })
              }
            />
            {
              errors.email?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo correo electronico es requerido
              </p>
            }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              {
              ...register("password", { required: true })
              }
            />
            {
              errors.password?.type === 'required' &&
              <p role="alert" style={{ color: "red", fontWeight: 'bold', marginTop: 10 }}>
                El campo contraseña es requerido
              </p>
            }
          </Form.Group>


          <Form.Group className="mb-3 d-grid gap-2">
            <Button size='lg' variant="success" type="submit">
              Iniciar Sesión
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Login
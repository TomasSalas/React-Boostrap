/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from '../../Components/NavBar/index.js'
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'

function Index() {
  
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])

  useEffect(() =>{
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
  },[])

  return (
    <div>
      <NavBar/>
      <Container>
        <h3> BIENVENIDO <span style={{color:"#545474"}}>{user.NOMBRES + ' ' + user.APELLIDOS }</span> </h3>
      </Container>
    </div>
  );
}

export default Index;
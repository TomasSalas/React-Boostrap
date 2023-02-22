/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from '../../Components/NavBar/index.js'
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
// import { redirect } from "react-router-dom";

function Index() {
  
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])
  let jwt = localStorage.getItem("jwt");


  useEffect(() =>{
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
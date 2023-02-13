/* eslint-disable react-hooks/exhaustive-deps */
import NavBar2 from '../../Components/NavBar/index2.js'
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Index() {
  
  const navigate =  useNavigate();
  const [ user , setUser ] = useState([])

  useEffect(() =>{
    setUser(JSON.parse(localStorage.getItem("user")));

    const jwt = localStorage.getItem("jwt");
    if (!jwt ) {
      navigate('/login')
      return;
    }


  },[])

  return (
    <div>
      <NavBar2/>
      <Container>
        <h3> BIENVENIDO <span style={{color:"#545474"}}>{user.NOMBRES + ' ' + user.APELLIDOS }</span> </h3>
      </Container>
    </div>
  );
}

export default Index;
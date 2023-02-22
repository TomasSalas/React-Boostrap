import Container from 'react-bootstrap/Container';
import { Nav , Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const closeSession = async () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">TICKETERA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/viewEmployees">Visualizar Empleados</Nav.Link>
            <Nav.Link as={Link} to="/createEmployees">Ingresar Empleados</Nav.Link>
            <Nav.Link as={Link} to="/viewTicket">Visualizar Ticket</Nav.Link>
            <Nav.Link as={Link} to="/createTicket">Crear Ticket</Nav.Link>
            <Nav.Link as={Link} to="/login">
              <Button 
                variant='danger' 
                size='sm'
                onClick={closeSession}>
                  Cerrar Sesión
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
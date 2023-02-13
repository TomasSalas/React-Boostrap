import Button from 'react-bootstrap/Button';

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <div className='position-fixed'>
        <h1 className="display-1 fw-bold text-white">404</h1>
      </div>
      <div className='position-relative' style={{marginTop:300}}>
        <Button variant="primary" href='/'>Volver</Button>
      </div>
    </div>
  )
}

export default NotFound
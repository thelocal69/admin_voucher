import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <Container>
    <div style={{ width: '50rem', height: '20rem', margin: '0 auto', padding: '10rem'}}>
                    <div className="text-center">
                        <h1>404</h1>
                        <h2>Page Not Found</h2>
                        <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                        <NavLink to='/Home' className='dropdown-item'>Back to home</NavLink>
                    </div>
    </div>
    </Container>
    </>
  )
}

export default NotFound
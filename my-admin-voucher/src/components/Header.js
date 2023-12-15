import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import SideMenu from './SideMenu';
import './Header.scss';
import { useLocation } from 'react-router-dom';
import logoBrand from '../assets/logo/logo-01.png';
import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';


const Header = (props) => {

    const [isShowMenu, setIsShowMenu] = React.useState(false);
    const location = useLocation();

    const handleClose = () => {
        setIsShowMenu(false);
    }

    return (<>
        <Navbar expand="lg" className="bg-white">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/">
                        <img
                            src={logoBrand}
                            className='nav-link'
                            alt='logo brand'
                        />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink onClick={() => setIsShowMenu(true)} className='nav-link'>Menu</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavLink to="/Login" className='dropdown-item'>Login</NavLink>
                            <NavLink to="/Logout" className='dropdown-item'>Logout</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <SideMenu
                show={isShowMenu}
                handleClose={handleClose}
            />
        </Container>

        <Routes>
            <Route path="/" element={<HomePage />}></Route>
        </Routes>
    </>)
}

export default Header;
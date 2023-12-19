import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import React from "react";
import SideMenu from "./SideMenu";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logoBrand from "../assets/logo/logo-01.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/feature/authSlice";
import store from "../redux/store";

const Header = (props) => {
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [isShowHeader, setIsShowHeader] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let isAuthenticated = store.getState().auth.isAuthenticated;
  console.log(isAuthenticated);
  React.useEffect(() => {
    if (isAuthenticated) {
      setIsShowHeader(true);
    }
  }, []);

  const handleClose = () => {
    setIsShowMenu(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      {isShowHeader && (
        <Navbar expand="lg" className="bg-white">
          <Container>
            <Navbar.Brand>
              <NavLink to="/Home">
                <img src={logoBrand} className="nav-link" alt="logo brand" />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={location.pathname}>
                <NavLink to="/Home" className="nav-link">
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setIsShowMenu(true)}
                  className="nav-link"
                >
                  Menu
                </NavLink>
              </Nav>
              <Nav>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavLink
                    to="/"
                    className="dropdown-item"
                    hidden={localStorage.getItem("token") ? true : false}
                  >
                    Login
                  </NavLink>
                  <NavDropdown.Item
                    hidden={localStorage.getItem("token") ? false : true}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <Container>
        <SideMenu show={isShowMenu} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default Header;

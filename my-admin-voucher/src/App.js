import './App.scss';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Container from 'react-bootstrap/Container';
import TableProducts from './components/TableProducts';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  const handleClose = () => {
    setIsShowMenu(false);
  }

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <button className='btn btn-primary'
            onClick={() => setIsShowMenu(true)}
          >Menu</button>
          <TableProducts />
        </Container>

        <SideMenu
          show={isShowMenu}
          handleClose={handleClose}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

import './App.scss';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react'

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
          <SideMenu
            show={isShowMenu}
            handleClose={handleClose}
          />
        </Container>
      </div>

    </>
  );
}

export default App;

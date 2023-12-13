import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SideMenu = (props) => {
    const { show, handleClose } = props;
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>COZASTORE ADMIN</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Offcanvas.Title>ss</Offcanvas.Title>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default SideMenu;
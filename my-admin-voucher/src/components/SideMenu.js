import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import '../components/SideMenu.scss';
import TableProducts from './TableProducts';
import Category from './Category';

const SideMenu = (props) => {

    const list = [
        "Product",
        "Category"
    ];

    const [activeTab, setActiveTab] = React.useState(0);
    const location = useLocation();

    const { show, handleClose } = props;

    React.useState(() => {
        let tab = 0;
        tab = list?.findIndex(
            (item) => location.pathname.replace("/", "") === item.toLowerCase()
        );
        setActiveTab(tab);
    }, []);

    const handleClick = (key) => {
        setActiveTab(key);
        handleClose();
    };

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>COZASTORE ADMIN</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        list?.map((item, key) => {
                            return (
                                <>
                                    <Link to={`${item.toLowerCase()}`}>
                                        <Offcanvas.Title
                                            key={key}
                                            onClick={() => handleClick(key)}
                                        >
                                            {item}
                                        </Offcanvas.Title>
                                    </Link>
                                </>
                            )
                        })
                    }
                </Offcanvas.Body>
            </Offcanvas>

            <Routes>
                <Route path="/Product" element={<TableProducts />}></Route>
                <Route path="/Category" element={<Category />}></Route>
            </Routes>
        </>
    );
}


export default SideMenu;
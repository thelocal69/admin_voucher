import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllProduct } from '../services/ProductService';
import { toast } from 'react-toastify';

const TableUsers = (props) => {

    const [list, setList] = React.useState();

    React.useEffect(() => {
        getProducts()
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
    }, []);

    const getProducts = async () => {
        let res = await getAllProduct();
        if (res && res.data) {
            setList(res.data)
        }
    }
    return (<>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Created date</th>
                </tr>
            </thead>
            <tbody>
                {list ?
                    list?.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item?.id}</td>
                                <td>{item?.name}</td>
                                <td>{item?.image}</td>
                                <td>{item?.price}</td>
                                <td>{item?.description}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.categoryName}</td>
                                <td>{item?.sizeName}</td>
                                <td>{item?.colorName}</td>
                                <td>{item?.createDate}</td>
                            </tr>
                        )
                    }) : "no data"}
            </tbody>
        </Table>
    </>)
}

export default TableUsers;
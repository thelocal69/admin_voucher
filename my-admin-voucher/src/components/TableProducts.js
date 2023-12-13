import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllProduct, insertProduct } from '../services/ProductService';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Offcanvas, Button, Form } from 'react-bootstrap';



const TableUsers = (props) => {

    const [isShowModalAddNew, setIsShowModalAddNew] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [totalProduct, setTotalProduct] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);

    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [category, setCategory] = React.useState("");
    const [size, setSize] = React.useState("");
    const [color, setColor] = React.useState("");

    React.useEffect(() => {
        getProducts(1)
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
    }, []);

    const getProducts = async (page) => {
        let res = await getAllProduct(page);
        if (res && res.data) {
            setTotalProduct(res.totalItems)
            setList(res.data)
            setTotalPage(res.totalPages)
        }
    }

    const handleSaveProduct = async () => {
        if (
            !name || !image ||
            !price || !description ||
            !quantity || !category ||
            !size || !color
        ) {
            toast.error("Please enter enough value !");
            return;
        }
        const obj = {
            name: name, image: image, price: price,
            description: description, quantity: quantity,
            categoryName: category, sizeName: size, colorName: color
        }
        await insertProduct(obj)
            .then((rs) => {
                if (rs) {
                    toast.success(rs.message);
                    getAllProduct(1)
                        .then((rs) => setList(rs.data))
                        .catch((err) => toast.error(err.message));
                    handleClose();
                    setName('');
                    setImage('');
                    setPrice(0);
                    setDescription('');
                    setQuantity(0);
                    setCategory('');
                    setColor('');
                    setSize('')
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const handleClose = () => {
        setIsShowModalAddNew(false);
    }

    const handlePageClick = (event) => {
        getProducts(+event.selected + 1);
    }

    return (<>
        <div className='my-3 d-flex justify-content-between'>
            List Products:
            <button className='btn btn-success'
                onClick={() => setIsShowModalAddNew(true)}
            >Add new product</button>
        </div>

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
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="<< previous"
            renderOnZeroPageCount={null}
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <Offcanvas show={isShowModalAddNew} onHide={handleClose} placement='end' backdrop="static">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add new product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter image"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter quantity"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" placeholder="Enter size"
                            value={size}
                            onChange={(event) => setSize(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" placeholder="Enter color"
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
                        />
                    </Form.Group>
                </Form>
                <div className='d-flex justify-content-between'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveProduct()}>
                        Save Changes
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    </>)
}

export default TableUsers;
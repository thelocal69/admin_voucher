import React, { useEffect, useState } from 'react';
import { getAllProduct, insertProduct, updateProduct, deleteProduct } from '../services/ProductService';
import { getAllColor } from '../services/ColorService';
import { getAllCategory } from '../services/CategoryService';
import { getAllSize } from '../services/SizeService';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Offcanvas, Button, Form, Modal, Table } from 'react-bootstrap';



const TableUsers = (props) => {

    const [isShowModalAddNew, setIsShowModalAddNew] = React.useState(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = React.useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = React.useState(false);

    const [list, setList] = React.useState([]);
    const [totalProduct, setTotalProduct] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [category, setCategory] = React.useState("");
    const [categoryNames, setCategoryNames] = React.useState([]);
    const [size, setSize] = React.useState("");
    const [sizeNames, setSizeNames] = React.useState([]);
    const [color, setColor] = React.useState("");
    const [colorNames, setColorNames] = React.useState([]);
    const [objEdit, setObjEdit] = React.useState({});
    const [objDelete, setObjDelete] = React.useState({});

    React.useEffect(() => {
        getProducts(1)
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
        getAllCategory()
            .then((rs) => {
                const value = rs?.data.map((item) => item.name);
                setCategoryNames(value);
            })
            .catch((err) => toast.error(err.message));
        getAllColor()
            .then((rs) => {
                const value = rs?.data.map((item) => item.name);
                setColorNames(value);
            })
            .catch((err) => toast.error(err.message));
        getAllSize()
            .then((rs) => {
                const value = rs?.data.map((item) => item.name);
                setSizeNames(value);
            })
            .catch((err) => toast.error(err.message));
    }, []);

    React.useEffect(() => {
        categoryNames && setCategory(categoryNames[0]);
    }, [categoryNames]);

    React.useEffect(() => {
        colorNames && setColor(colorNames[0]);
    }, [colorNames]);

    React.useEffect(() => {
        sizeNames && setSize(sizeNames[0]);
    }, [sizeNames]);

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

    const handleUpdateProduct = async () => {
        await updateProduct(objEdit)
            .then((rs) => {
                if (rs) {
                    toast.success(rs.message);
                    getAllProduct(currentPage)
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

    const handleDeleteProduct = async (product) => {
        await deleteProduct(objDelete)
            .then((rs) => {
                if (rs) {
                    toast.success(rs.message);
                    getAllProduct(currentPage)
                        .then((rs) => setList(rs.data))
                        .catch((err) => toast.error(err.message));
                    handleClose();
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const handClickEditProduct = (product) => {
        setObjEdit(product);
        setIsShowModalUpdate(true);
    }

    const handClickDeleteProduct = (product) => {
        setObjDelete(product);
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalUpdate(false);
        setIsShowModalDelete(false);
    }

    const handlePageClick = (event) => {
        getProducts(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
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
                    <th>No</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list ?
                    list?.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item?.id}</td>
                                <td>{item?.name}</td>
                                <td>{item?.image}</td>
                                <td>{item?.price}</td>
                                <td>{item?.description}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.categoryName}</td>
                                <td>{item?.sizeName}</td>
                                <td>{item?.colorName}</td>
                                <td>
                                    <button className='btn btn-warning mx-2'
                                        onClick={() => handClickEditProduct(item)}
                                    >Edit</button>
                                    <button className='btn btn-danger mx-2'
                                        onClick={() => handClickDeleteProduct(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }) : "no data"}
            </tbody>
        </Table >
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
                        <Form.Select type="text" placeholder="Enter category"
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            {categoryNames?.map((item) => {
                                return <option value={item}>{item}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Select type="text" placeholder="Enter size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            {sizeNames?.map((item) => {
                                return <option value={item}>{item}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Select type="text" placeholder="Enter color"
                            onChange={(event) => setColor(event.target.value)}
                        >
                            {colorNames?.map((item) => {
                                return <option value={item}>{item}</option>
                            })}
                        </Form.Select>
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

        <Offcanvas show={isShowModalUpdate} onHide={handleClose} placement='end' backdrop="static">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Update product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.name = event.target.value;
                                setObjEdit(element);
                            }}
                            defaultValue={objEdit?.name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter image"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.image = event.target.value;
                                setObjEdit(element);
                            }}
                            defaultValue={objEdit?.image}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.price = event.target.value;
                                setObjEdit(element);
                            }}
                            defaultValue={objEdit?.price}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.description = event.target.value;
                                setObjEdit(element);
                            }}
                            defaultValue={objEdit?.description}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter quantity"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.quantity = event.target.value;
                                setObjEdit(element);
                            }}
                            defaultValue={objEdit?.quantity}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select type="text" placeholder="Enter category"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.categoryName = event.target.value;
                                setObjEdit(element);
                            }}
                        >
                            {
                                categoryNames?.map((item) => {
                                    return (
                                        <option value={item}
                                            selected={item === objEdit?.category ? true : false}
                                        >
                                            {item}
                                        </option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Select type="text" placeholder="Enter size"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.sizeName = event.target.value;
                                setObjEdit(element);
                            }}
                        >
                            {
                                sizeNames?.map((item) => {
                                    return (
                                        <option
                                            value={item}
                                            selected={item === objEdit?.size ? true : false}
                                        >
                                            {item}
                                        </option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Select type="text" placeholder="Enter color"
                            onChange={(event) => {
                                let element = { ...objEdit }
                                element.colorName = event.target.value;
                                setObjEdit(element);
                            }}
                        >
                            {
                                colorNames?.map((item) => {
                                    return (
                                        <option
                                            value={item}
                                            selected={item === objEdit?.color ? true : false}
                                        >
                                            {item}
                                        </option>
                                    );
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
                <div className='d-flex justify-content-between'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateProduct()}>
                        Update Changes
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>

        <Modal show={isShowModalDelete} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete !</Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleDeleteProduct()}>
                    Delete it
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default TableUsers;
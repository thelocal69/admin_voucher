import React from 'react';
import {
    getAllProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    getProductByName,
    getAllProductNoClause
} from '../services/ProductService';
import { getAllColorName } from '../services/ColorService';
import { getAllCategoryName } from '../services/CategoryService';
import { getAllSizeName } from '../services/SizeService';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Offcanvas, Button, Form, Modal, Table } from 'react-bootstrap';
import '../components/TableProduct.scss';
import { debounce } from 'lodash';
import { CSVLink } from "react-csv";
import Papa from 'papaparse';



const TableUsers = (props) => {

    const [isShowModalAddNew, setIsShowModalAddNew] = React.useState(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = React.useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = React.useState(false);

    const [list, setList] = React.useState([]);
    const [totalProduct, setTotalProduct] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortBy, setSortBy] = React.useState("desc");
    const [sortField, setSortField] = React.useState("id");
    const [keyWord, setKeyWord] = React.useState("");
    const [dataExport, setDataExport] = React.useState([]);

    const [id, setId] = React.useState(1);
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
        getAllProduct(currentPage, sortBy, sortField)
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
        getProductName(keyWord)
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
        getAllProductNoClause()
            .then((rs) => setDataExport(rs.data))
            .catch((err) => toast.error(err.message));
        getAllCategoryName()
            .then((rs) => {
                const value = rs.data;
                setCategoryNames(value);
            })
            .catch((err) => toast.error(err.message));
        getAllColorName()
            .then((rs) => {
                const value = rs.data;
                setColorNames(value);
            })
            .catch((err) => toast.error(err.message));
        getAllSizeName()
            .then((rs) => {
                const value = rs.data;
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

    const getProducts = async (page, sortBy, sortField) => {
        let res = await getAllProduct(page, sortBy, sortField);
        if (res && res.data) {
            setTotalProduct(res.totalItems);
            setList(res.data);
            setTotalPage(res.totalPages);
        }
    }

    const getProductName = async (keyWord) => {
        let res = await getProductByName(keyWord);
        if (res && res.data) {
            setList(res.data);
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
                    getAllProduct(currentPage, sortBy, sortField)
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
                    getAllProduct(currentPage, sortBy, sortField)
                        .then((rs) => setList(rs.data))
                        .catch((err) => toast.error(err.message));
                    handleClose();
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
                    getAllProduct(currentPage, sortBy, sortField)
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
        getProducts(+event.selected + 1, sortBy, sortField);
        setCurrentPage(+event.selected + 1);
    }

    const handleSortClick = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        getProducts(currentPage, sortBy, sortField);
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept CSV file !");
            }
            Papa.parse(file, {
                header: true,
                complete: function (result) {
                    console.log("finished: ", result);
                }
            });
        }
    }

    const handleSearchByName = debounce((event) => {
        let term = event.target.value;
        if (term) {
            setKeyWord(term)
            getProductName(term);
        } else {
            getProducts(currentPage, sortBy, sortField);
        }
    }, 1000)

    return (<>
        <div className='my-3 d-flex justify-content-between'>
            <span>
                <b>List Products:</b>
            </span>
            <div className='group-btns'>
                <div>
                    <label htmlFor='Import File' className='btn btn-secondary'>
                        <i class="fa-solid fa-file-import"></i>
                        Import File
                    </label>
                    <input id='Import File' type='file' hidden
                        onChange={(event) => handleImportCSV(event)}
                    />
                </div>
                <CSVLink
                    data={dataExport}
                    filename={"product-cozastore.csv"}
                    className="btn btn-info"
                    target="_blank"
                >
                    <i class="fa-solid fa-file-export"></i>
                    Export File
                </CSVLink>
            </div>
        </div>
        <div className='my-3 d-flex justify-content-between'>
            <div>
                <input
                    className='form-control'
                    placeholder='Search product by name...'
                    onChange={(event) => handleSearchByName(event)}
                />
            </div>
            <button className='btn btn-success'
                onClick={() => setIsShowModalAddNew(true)}
            >
                <i class="fa-solid fa-circle-plus"></i>
                <span>Add new product</span>
            </button>
        </div>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>No</th>
                    <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span>
                                <i class="fa-solid fa-sort-down"
                                    onClick={() => handleSortClick("desc", "id")}
                                ></i>
                                <i class="fa-solid fa-sort-up"
                                    onClick={() => handleSortClick("asc", "id")}
                                ></i>
                            </span>
                        </div>
                    </th>
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
                                    >
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <span>Edit</span>
                                    </button>
                                    <button className='btn btn-danger mx-2'
                                        onClick={() => handClickDeleteProduct(item)}
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                        <span>Delete</span>
                                    </button>
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
                        <i class="fa-solid fa-circle-xmark"></i>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveProduct()}>
                        <i class="fa-solid fa-floppy-disk"></i>
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
                                            selected={item === objEdit?.categoryName ? true : false}
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
                                            selected={item === objEdit?.sizeName ? true : false}
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
                                            selected={item === objEdit?.colorName ? true : false}
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
                        <i class="fa-solid fa-circle-xmark"></i>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateProduct()}>
                        <i class="fa-solid fa-floppy-disk"></i>
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
                    <i class="fa-solid fa-circle-xmark"></i>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleDeleteProduct()}>
                    <i class="fa-solid fa-check"></i>
                    Delete it
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default TableUsers;
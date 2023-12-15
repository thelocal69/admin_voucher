import React from "react";
import { getAllColor } from '../services/ColorService';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';


const Color = () => {
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        getAllColor()
            .then((rs) => setList(rs.data))
            .catch((err) => toast.error(err.message));
    }, []);

    return (
        <>
            <div className='my-3 d-flex justify-content-between'>
                List Color:
                <button className='btn btn-success'

                >Add new color</button>
            </div>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID</th>
                        <th>Name</th>
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
                                    <td>
                                        <button className='btn btn-warning mx-2'

                                        >Edit</button>
                                        <button className='btn btn-danger mx-2'

                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        }) : "no data"}
                </tbody>
            </Table >
        </>
    )
}

export default Color;;
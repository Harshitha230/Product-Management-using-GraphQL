import Table from 'react-bootstrap/Table';
import {Button} from '@material-ui/core';
import {useNavigate} from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '../queries/queries';
import DeleteProduct from './deleteProduct';
import '../styling/Table.css'

function Dashboard(props) {
    const navigate = useNavigate()
    const { error, data } = useQuery(ALL_PRODUCTS)

    function logout(){
        localStorage.setItem('token', null)
        navigate('/login')

    }

    function gotoCreate() {
        navigate('/create')
    }

    function fieldTable() {
        return data.products.map((res, i) => {
            return <DeleteProduct obj={res} key={i} />;
        });
    }

    if(error){
        console.log(error)
        return
    }

    if(data){
        return( <div className="table-wrapper" style={{ marginTop: '100px' }}>
            <div>
                <center>
                    <h1>PRODUCT DASHBOARD </h1>
                <br></br>

                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={gotoCreate}
                >
                Add Product
                </Button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={logout}
                >
                Logout
                </Button>
                </center>
            </div>
            <br></br>
            <br></br>

            <center>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th> 
                        <th>Price/unit</th>
                        <th>Units in Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fieldTable()}
                </tbody>
            </Table>
            </center>
        </div>

        )
    }
}
export default Dashboard
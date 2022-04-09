import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PRODUCT, GET_PRODUCT } from '../queries/queries';
import swal from 'sweetalert';

function DeleteProduct(props){
    const navigate = useNavigate();
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT); 


    function deleteProduct(id){
        deleteProductMutation({variables: {id: props.obj.id}})
        .then((result) => {
            swal({
                text: 'Product deleted successfully',
                icon: 'success'
            })
            navigate('/dashboard')
            window.location.reload()
        })
        .catch((error) => {
            swal({
                text: 'Failed to delete product',
                icon: 'error'
            })
            console.log(error)
        })
    }

    const {error, data} = useQuery(GET_PRODUCT, {variables:{id: props.obj.id}});

    function onUpdate(){
        navigate('/update/'+ props.obj.id)
        localStorage.setItem('productID', props.obj.id)
        localStorage.setItem('productName',props.obj.name)
    }

    if(error){
        console.log(error)
    }

    if(data){
        return(
            <tr>
                <td style={{fontSize:"18px", fontFamily:"cursive"}}>{props.obj.name}</td>
                <td style={{fontSize:"18px", fontFamily:"cursive"}}>{props.obj.price}</td>
                <td style={{fontSize:"18px", fontFamily:"cursive"}}>{props.obj.quantity}</td>
                <td>
                    <Button onClick={onUpdate} size="sm" >
                    Update
                    </Button> &nbsp; &nbsp; &nbsp; &nbsp;

                    <Button  onClick={deleteProduct} size="sm" variant="danger">
                    Delete
                    </Button>
                </td>
            </tr>
            
        )
    }
}

export default DeleteProduct

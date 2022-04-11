import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PRODUCT, GET_PRODUCT } from '../queries/queries'
import swal from 'sweetalert'
import '../styling/Table.css'

function DeleteProduct(props) {
  const navigate = useNavigate()
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT)

  function deleteProduct(id) {
    //Delete existing product
    deleteProductMutation({ variables: { id: props.obj.id } })
      .then(result => {
        swal({
          text: 'Product deleted successfully',
          icon: 'success',
        })
        navigate('/dashboard')
        window.location.reload()
      })
      .catch(error => {
        swal({
          text: 'Failed to delete product',
          icon: 'error',
        })
        console.log(error)
      })
  }

  const { error, data } = useQuery(GET_PRODUCT, {
    variables: { id: props.obj.id },
  })

  function onUpdate() {
    navigate('/update/' + props.obj.id)
    localStorage.setItem('productID', props.obj.id)
    localStorage.setItem('productName', props.obj.name)
  }

  if (error) {
    console.log(error)
  }

  if (data) {
    return (
      <tr className="table-rows">
        <td>{props.obj.name}</td>
        <td>{props.obj.price}</td>
        <td>{props.obj.quantity}</td>
        <td>
          <Button className="bt-4" onClick={onUpdate} size="sm">
            Update
          </Button>{' '}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            className="bt-4"
            onClick={deleteProduct}
            size="sm"
            variant="danger"
          >
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}

export default DeleteProduct

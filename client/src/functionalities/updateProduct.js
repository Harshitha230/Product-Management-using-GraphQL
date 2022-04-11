import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_PRODUCT, GET_PRODUCT } from '../queries/queries'
import swal from 'sweetalert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../styling/Forms.css'

function UpdateProduct(props) {
  const productName = localStorage.getItem('productName')
  const navigate = useNavigate()
  const productID = localStorage.getItem('productID')
  const [name, setName] = useState({ name: '' })
  const [price, setPrice] = useState({ price: '' })
  const [quantity, setQuantity] = useState({ quantity: '' })

  function onChangePrice(e) {
    setPrice(e.target.value)
  }

  function onChangeQuantity(e) {
    setQuantity(e.target.value)
  }

  const [updateProductMutation] = useMutation(UPDATE_PRODUCT)
  const { error, data } = useQuery(
    GET_PRODUCT,
    { variables: { id: productID } },
    []
  )

  if (error) {
    console.log(error)
  }

  if (data) {
    if (name.length === 0 && price.length === 0 && quantity.length === 0) {
      setName({ name: data.product.name })
      setPrice({ price: data.product.price })
      setQuantity({ quantity: data.product.quantity })
    }
  }

  function onCancel() {
    navigate('/dashboard')
  }

  function onSubmit(e) {
    e.preventDefault()
    let errormsg = ''
    if (!(name && price && quantity)) {
      errormsg = 'All fields must be filled'
      swal({
        text: 'Please fill all the fields',
        icon: 'error',
        type: 'error',
      })
    }
    if (errormsg.length) {
      console.log(errormsg)
      return
    }

    updateProductMutation({
      variables: {
        id: productID,
        name: productName,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      },
    })
      .then(result => {
        const res = result.data.updateProduct
        swal({
          text: 'Product updated successfully',
          icon: 'success',
          type: 'success',
        })
        localStorage.setItem('id', res.id)
        navigate('/dashboard')
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
        swal({
          text: 'Failed to update Product',
          icon: 'error',
          type: 'error',
        })
      })
  }

  return (
    <div className="form-wrapper">
      <center>
        {' '}
        <h2> UPDATE PRODUCT</h2>
      </center>

      <Form className="form" onSubmit={onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={productName} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price/Unit</Form.Label>
          <Form.Control
            type="text"
            defaultValue={''}
            onChange={onChangePrice}
            placeholder="price"
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="text"
            defaultValue={''}
            onChange={onChangeQuantity}
            placeholder="quantity"
          />
        </Form.Group>
        <Button
          variant="danger"
          size="lg"
          block="block"
          className="mt-4"
          type="submit"
          onClick={onSubmit}
        >
          Update Product
        </Button>{' '}
        &nbsp; &nbsp;
        <Button
          size="lg"
          block="block"
          type="submit"
          className="mt-4"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Form>
    </div>
  )
}

export default UpdateProduct

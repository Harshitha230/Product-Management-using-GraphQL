import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT } from '../queries/queries'
import swal from 'sweetalert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../styling/Forms.css'

function CreateProduct(props) {
  const navigate = useNavigate()
  const [name, setName] = useState({ name: '' })
  const [price, setPrice] = useState({ price: '' })
  const [quantity, setQuantity] = useState({ quantity: '' })
  const [createProductMutation] = useMutation(CREATE_PRODUCT)

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onChangePrice(e) {
    setPrice(e.target.value)
  }

  function onChangeQuantity(e) {
    setQuantity(e.target.value)
  }

  function onCancel() {
    navigate('/dashboard')
  }

  function onSubmit(e) {
    e.preventDefault()
    let errormsg = ''
    if (!(name || price || quantity)) {
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

    createProductMutation({
      variables: {
        id: props.id,
        name: name,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      },
    })
      .then(result => {
        const res = result.data.createProduct
        swal({
          text: 'Product created successfully',
          icon: 'success',
          type: 'success',
        })
        localStorage.setItem('id', res.id)
        navigate('/dashboard')
      })
      .catch(error => {
        console.log(error)
        swal({
          text: 'Failed to create Product',
          icon: 'error',
          type: 'error',
        })
      })
  }

  return (
    <div className="form-wrapper">
      <center>
        {' '}
        <h2> CREATE PRODUCT</h2>{' '}
      </center>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={''}
            onChange={onChangeName}
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price/Unit</Form.Label>
          <Form.Control
            type="text"
            defaultValue={''}
            onChange={onChangePrice}
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="text"
            defaultValue={''}
            onChange={onChangeQuantity}
            placeholder="Quantity"
          />
        </Form.Group>
        <Button
          variant="danger"
          size="lg"
          block="block"
          type="submit"
          className="mt-4"
        >
          Create Product
        </Button>{' '}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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

export default CreateProduct

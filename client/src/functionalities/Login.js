import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '../queries/queries'
import { useMutation } from '@apollo/client'
import swal from 'sweetalert'
import { Button, TextField, Link, Avatar } from '@material-ui/core'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import '../styling/Userform.css'

function Login(props) {
  const [loginMutation] = useMutation(USER_LOGIN)
  const navigate = useNavigate()
  const [field, setField] = useState({ email: '', password: '' })

  function onChange(e) {
    const name = e.target.name
    const value = e.target.value
    setField({ ...field, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault()
    let errormsg = ''
    if (!(field.email || field.password)) {
      errormsg = 'All fields must be filled'
      swal({
        text: 'Please fill all the fields',
        icon: 'error',
        type: 'error',
      })
    }

    if (errormsg) {
      console.log(errormsg)
      return
    }

    loginMutation({
      variables: { email: field.email, password: field.password },
    })
      .then(result => {
        const res = result.data.userLogin
        console.log(res)
        swal({
          text: 'User logged in sucessfully',
          icon: 'success',
          type: 'success',
        })
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.id)
        navigate('/dashboard')
      })
      .catch(error => {
        console.log(error)
        swal({
          text: 'Error in logging in user',
          icon: 'error',
          type: 'error',
        })
      })
  }

  return (
    <div className="wrapper">
      <center>
        <Avatar className="avatar">
          <AccountCircleOutlined />
        </Avatar>

        <h3> User Login</h3>

        <div>
          <TextField
            className="tf-1"
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={field.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <br></br>
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={field.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <br></br>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="large"
            disabled={field.email === '' && field.password === ''}
            onClick={onSubmit}
          >
            Login
          </Button>{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link className="link_style" href="/">
            Sign Up
          </Link>
        </div>
      </center>
    </div>
  )
}

export default Login

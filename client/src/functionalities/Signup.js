import { useState } from "react"
import { Button, TextField, Link, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { USER_SIGNUP } from "../queries/queries"

function Signup(props){
    const navigate = useNavigate()
    const [signUpMutation] = useMutation(USER_SIGNUP)
    const [field, setField] = useState({ name: "", email: "", password: ""  })

    function onChange(e) {
        const name = e.target.name
        const value = e.target.value
        setField({ ...field, [name]: value })
    }

    function onSubmit(e) {
        e.preventDefault()
        let errormsg=""
        if(!(field.name || field.email || field.password)){
            errormsg = 'All fields must be filled'
            swal({
                text: 'Please fill all the fields',
                icon: 'error',
                type: 'error'
            })
        }
        if(errormsg.length){
            console.log(errormsg)
            return
        }

        signUpMutation({variables: {name: field.name, email: field.email, password: field.password}})
        .then((result) => {
            const res = result.data.userSignUp
            swal({
                text: 'User registered successfully',
                icon: 'success',
                type: 'success'
            })
            localStorage.setItem('id', res.id)
            navigate('/login')
        })
        .catch((error) => {
            console.log(error)
            swal({
                text: 'Failed to sign up Product',
                icon: 'error',
                type: 'error'
            })
        })
    }

    return (
        <div style={{ marginTop: '200px' }}>
            <center>
                <Avatar className="avatar">
                    <LockOutlinedIcon style={{color: "blue", background: "white", fontSize:40, width:"100%"}} />
                </Avatar>
                <h3 style={{marginTop:"20px", fontFamily:"cursive"}}> User Signup</h3>
                
                <div>
                    <TextField
                        style={{marginTop:"20px"}}
                        id="standard-basic"
                        type="text"
                        autoComplete="off"
                        name="name"
                        value={field.name}
                        onChange={onChange}
                        placeholder="Name"
                        required
                    />
                    <br /> <br />

                    <TextField
                        id="standard-basic"
                        type="text"
                        autoComplete="off"
                        name="email"
                        value={field.email}
                        onChange={onChange}
                        placeholder="Email"
                        required
                    />
                    <br /> <br />

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
                    <br /> <br />
                    <br /> <br />

                    <Button
                        style={{fontSize:"18px", fontFamily:"cursive"}}
                        className="button_style"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={field.name === '' && field.email === '' && field.password === ''}
                        onClick={onSubmit}
                    >
                    Sign Up
                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Link href="/login" style={{fontSize:"20px", fontFamily:"cursive"}}>
                    Login
                    </Link>
                </div>
            </center>
        </div>
    )
}

export default Signup


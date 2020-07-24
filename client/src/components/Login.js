import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";


const initialFormValues = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState(initialFormValues)
  const history = useHistory()

  const changeHandler = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault()
    fetchToken(state.username, state.password)
    setState(initialFormValues)
  }

  const fetchToken = (username, password) => {
    axios.post("http://localhost:5000/api/login", { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/bubble-page')
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input name="username" placeholder="Username" onChange={changeHandler} value={state.username} />
        <input name="password" placeholder="Password" onChange={changeHandler} value={state.password} type="password"/>
        <button onClick={submitLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;

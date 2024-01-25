
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import PropTypes from 'prop-types'
import InputComponent from "../InputComponent";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const styleH1 = {
    margin: '20px',
    fontSize: '60px',
    fontWeight: 'bold',
  }

  const { formState, onInputChange } = useForm({
    username: '',
    password: '',
  });

  const { username, password } = formState;

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      console.log('llego');
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formState.username,
          password: formState.password,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Token:", result.token);

        navigate('/detalle');
      } else {
        const errorResponse = await response.json();
        console.error("Login failed:", errorResponse.message);

        setError(errorResponse.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };



  return (
    <div className="container">
      <div className="row">

        <form className=" text-center">
          <h1 style={styleH1}>Login</h1>

          <h2>Usuario</h2>

          <InputComponent
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onInputChange}
            autoComplete="username"
          />

          <h2>Password</h2>

          <InputComponent
            type="password"
            className="form-control"
            placeholder="Username"
            name="password"
            value={password}
            onChange={onInputChange}
            autoComplete="current-password"
          />

          <button className="btn btn-primary mt-2 col-2" onClick={handleLoginClick}>Login</button>
        </form>

      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginPage
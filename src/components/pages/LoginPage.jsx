
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import InputComponent from "../InputComponent";
import { useState } from "react";
import { apiCall } from "../../utility/common";

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
      const response = await apiCall(
        "login",
        "POST",
        JSON.stringify({
          userName: formState.username,
          password: formState.password,
        }),
      );
      
      if (response.ok) {
        const { token } = await response.json();

        onInputChange({ target: { name: 'username', value: '' } });
        onInputChange({ target: { name: 'password', value: '' } });
        localStorage.setItem('token', token);

        navigate('/');

      } else {
        const errorResponse = await response.json();
        console.error("Login failed:", errorResponse.message);

        setError(errorResponse.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };



  return (
    <div className="container">
      <div className="row">

        <form className=" text-center" onSubmit={handleLoginClick}>
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
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
            autoComplete="current-password"
          />

          <button className="btn btn-primary mt-2 col-2" type="submit" >Login</button>
        </form>

      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}


export default LoginPage
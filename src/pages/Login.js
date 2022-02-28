import { Button, CircularProgress, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCallingApi, setIsCallingApi] = useState(false);

  const validarFormulario = () => {
    if (userName.length > 0 && password.length > 0) {
      setIsCallingApi(true);
      axios({
        method: "post",
        url: "http://challenge-react.alkemy.org",
        data: {
          email: userName,
          password: password,
        },
      })
        .then((response) => {
          //proceso la respuesta
          localStorage.setItem("token", response.data?.token);
          navigate("/");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        })
        .finally(() => {
          setIsCallingApi(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Completa los campos email y password!",
      });
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        disabled={isCallingApi}
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        id="email"
        label="Email"
      />
      <TextField
        disabled={isCallingApi}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        id="password"
        label="Password"
        type="password"
        l
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isCallingApi}
        onClick={validarFormulario}
      >
        Enviar{isCallingApi && <CircularProgress />}
      </Button>
    </form>
  );
};

export default Login;

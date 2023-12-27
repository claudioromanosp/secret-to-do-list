import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/";
import Input from "../../components/Input/";
import { auth } from "../../config";
import {  createUserWithEmailAndPassword } from "firebase/auth";


function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  
  async function handleRegister(e){
    e.preventDefault();
        if (email !== "" && password !== "") {
          try {
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            )
            navigate("/admin", { replace: true });
          } catch (error) {

            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("código do erro: " + errorCode);
            console.log("mensagem: " + errorMessage);

            if (errorCode === "auth/email-already-in-use") {

              setFeedback("E-mail já esta em uso");

            } else if (errorCode === "auth/weak-password") {

              setFeedback("Senha com no mínimo 6 caracteres");

            } else if (errorCode === "auth/invalid-email") {
              
              setFeedback("Digite um e-mail válido");
            }
          }
        }else {
          setFeedback("Cadastre seu e-mail e senha");
        }
    }

    function inputEmail(e){
        let input = e.target.value;
        setEmail(input)
    }

    function inputPassword(e) {
      let input = e.target.value;
      setPassword(input);
    }


return (
  <div className="container">
    <h1>Cadastre-se</h1>
    <form className="form form-login" onSubmit={handleRegister}>
      <Input
        type="text"
        name="email"
        value={email}
        placeholder="E-mail"
        onChange={inputEmail}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Senha"
        onChange={inputPassword}
      />
      <p className="feedback">{feedback}</p>
      <Button label="Cadastrar" className="btn btn-large" />
    </form>
    <Link className="button-link" to="/">
      Já possui uma conta? Faça o login aqui.
    </Link>
  </div>
);
}

export default Register;
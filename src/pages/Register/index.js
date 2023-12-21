import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth } from "../../config";
import {  createUserWithEmailAndPassword } from "firebase/auth";


function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  async function handleRegister(e){
    e.preventDefault();
    
        if(email !== '' && password !== ""){
          await createUserWithEmailAndPassword(auth, email, password)
          .then(()=>{
            navigate("/admin",{replace: true })
          })
          .catch((error)=>{ console.log("error:" + error)})
        }else{
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
    <form className="form" onSubmit={handleRegister}>
      <input
        type="text"
        name="email"
        value={email}
        placeholder="E-mail"
        onChange={inputEmail}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Senha"
        onChange={inputPassword}
      />
      <Button label="Cadastrar" className="btn btn-large" />
    </form>
    <Link className="button-link" to="/">
      Já possui uma conta? Faça o login aqui.
    </Link>
  </div>
);
}

export default Register;
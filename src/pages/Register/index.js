import React, { useState } from "react";
import { Link } from "react-router-dom";



function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(e){
        e.preventDefault();
        if(email !== '' && password !== ""){
            console.log('teste')
        }else{
            console.log("preencha");
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
      <button>Cadastrar</button>
    </form>
    <Link className="button-link" to="/">Já possui uma conta? Faça o login aqui.</Link>
  </div>
);
}

export default Register;
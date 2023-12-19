import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles.css'

function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function inputEmail(e){
        let input = e.target.value
        setEmail(input)
    }

    function inputPassword(e) {
      let input = e.target.value
      setPassword(input)
    }

return (
  <div className="container">
    <h1>Secret To Do List</h1>
    <form className="form">
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
      <button>Login</button>
    </form>
    <Link className="button-link" to="/register">
      Não possui uma conta? Cadastre-se aqui.
    </Link>
  </div>
);
}

export default Home;
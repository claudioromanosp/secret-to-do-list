import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import Button from "../../components/Button/";
import Input from "../../components/Input/";
import { auth } from "../../config"
import { signInWithEmailAndPassword } from "firebase/auth";

function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();

    function inputEmail(e){
        let input = e.target.value
        setEmail(input)
    }

    function inputPassword(e) {
      let input = e.target.value
      setPassword(input)
    }

   async function handleLogin(e) {
     e.preventDefault();
     if (email.trim() !== "" && password.trim() !== "") {
       try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate("/admin", { replace: true });
       } catch (error) {
         console.error("Error:", error);
         setFeedback("Insira um e-mail e senha válidos")
       }
     } else {
      setFeedback("E-mail e/ou senha inválidos");
     }
   }

return (
  <div className="container">
    <h1>Secret To Do List</h1>

    <form className="form" onSubmit={handleLogin}>
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

      <Button label="Login" className="btn btn-large" />
    </form>
    <Link className="button-link" to="/register">
      Não possui uma conta? Cadastre-se aqui.
    </Link>
  </div>
);
}

export default Home;
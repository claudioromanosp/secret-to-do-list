import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import Button from "../../components/Button/";
import Input from "../../components/Input/";
import Loading from "../../components/Loading";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

function Home(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(true);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      navigate("/admin", { replace: true });
    } catch (error) {
      setLoading(false);

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  function inputEmail(e){
      let input = e.target.value;
      setEmail(input);
  }

  function inputPassword(e) {
    let input = e.target.value;
    setPassword(input);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
    setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin", { replace: true });
      } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("código do erro: " + errorCode);
        console.log("mensagem: " + errorMessage);
        setLoading(false)
        if (errorCode === "auth/invalid-credential") {
          setFeedback("Digite seu e-mail e senha");
        }  else if (errorCode === "auth/invalid-email") {
          setFeedback("Digite um e-mail válido");
        }
      }
    } else {
    setLoading(false)
      setFeedback("Digite seu e-mail e senha");
    }
  }

  return (
    <div className="container">
      <h1>Secret To Do List </h1>
      {loading && <Loading />}
      <form className="form form-login" onSubmit={handleLogin}>
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

      <h2 className="subtitle-login">ou se preferir:</h2>
      <GoogleButton
        type="dark"
        label="Login com Google"
        className="google-login"
        onClick={loginGoogle}
      />
      <Link className="button-link" to="/register">
        Não possui uma conta? Cadastre-se aqui.
      </Link>
    </div>
  );
}

export default Home;
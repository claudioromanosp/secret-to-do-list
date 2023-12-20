import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles.css';
import { auth } from "../../config";
import { signOut } from "firebase/auth";

function Admin(){
  const [task, setTask] = useState("")

function inputTask(e){
  e.preventDefault()
    let input = e.target.value
    setTask(input)   
  }

  function handleRegister(e) {
    e.preventDefault();
    let input = e.target.value;
    setTask(input);
  }

  async function handleLogOut(){
    await signOut(auth)
  }


  return (
    <div className="container">
      <h1>Minhas Tarefas</h1>


      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa ..."
          value={inputTask}
          onChange={inputTask}
        ></textarea>
        <button>Criar Tarefa</button>
      </form>
      <article>
        <button className="btn btn-delete">Concluir</button>
        <button
        className="btn btn-logout"
        onClick={handleLogOut}
        >Sair</button>
      </article>
    </div>
  );
}

export default Admin;
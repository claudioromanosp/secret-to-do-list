import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles.css';

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

    </div>
  );
}

export default Admin;
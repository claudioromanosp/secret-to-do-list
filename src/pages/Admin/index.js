import React, { useState, useEffect } from "react";
import './styles.css';
import { auth, db } from "../../config";
import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function Admin(){
  const [taskInput, setTaskInput] = useState("")
  const [user, setUser] = useState({})

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))
    }
    loadTasks();
  },[])


  async function handleRegister(e) {
    e.preventDefault();

    if(taskInput === ""){
      alert("Escreva sua tarefa !")
      return;
    }
    await addDoc(collection(db, "tasks"), {
      task: taskInput,
      created: new Date(),
      userUid: user.uid
    })
      .then(() => {
        console.log("tarefa criada");
        setTaskInput("")
      })
      .catch((error) => {
        console.log("erro: " + error);
      });
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
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        ></textarea>
        <button>Criar Tarefa</button>
      </form>

      <article>
        <button className="btn btn-logout" onClick={handleLogOut}>
          Sair
        </button>
      </article>
    </div>
  );
}

export default Admin;
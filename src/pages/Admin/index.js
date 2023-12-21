import React, { useState, useEffect } from "react";
import './styles.css';
import Button from "../../components/Button/";
import Input from "../../components/Input/";
import { auth, db } from "../../config";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";

function Admin(){
  const [taskInput, setTaskInput] = useState("")
  const [user, setUser] = useState({})
  const [todo, setTodo] = useState([])
  const [feedback, setFeedback] = useState("Escreva a nova tarefa:")

  useEffect(() => {
    // get user data from localStorage
    const userDetail = localStorage.getItem("@detailUser");
    setUser(JSON.parse(userDetail));

    if (userDetail) {
      const data = JSON.parse(userDetail);

      const q = query(
        collection(db, "tasks"),
        orderBy("created", "desc"),
        where("userUid", "==", data?.uid)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            userUid: doc.data().userUid,
            task: doc.data().task,
          });
        });
        setTodo(list);
      });

      // Clearing the subscription when the component is unmounted or when the condition changes
      return () => unsub();
    }
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if(taskInput === ""){
      setFeedback("Escreva sua tarefa !");
      return;
    }
     try {
       await addDoc(collection(db, "tasks"), {
         task: taskInput,
         created: new Date(),
         userUid: user.uid,
       });
       setFeedback("Escreva a nova tarefa:");
       setTaskInput("");
     } catch (error) {
      setFeedback("Não consegui criar a tarefa :(");
      console.error("Erro ao criar tarefa:", error);
     }
  }

  async function handleLogOut(){
    await signOut(auth)
  }

  async function handleDelete(id) {
    try {
       await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      setFeedback("Não consegui excluir a tarefa :(");
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  return (
    <div className="container-admin">
      <Button
        className="btn btn-logout btn-red"
        label="Sair"
        onClick={handleLogOut}
      />
      <h1>Minhas Tarefas</h1>
      <form className="form" onSubmit={handleRegister}>
        <p className="feedback">{feedback}</p>
        <textarea
          placeholder="Escreva aqui ..."
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        ></textarea>
        <Button label="Criar Tarefa" className="btn btn-large" />
      </form>


      {todo.map((item) => {
        return (
          <>
            <ul className="list-tasks">
              <li key={item.id}>
                <p>
                  {item.task}
                </p>
              </li>
              <li>
                <Button label="Editar" className="btn btn-small" />
                <span> | </span>{" "}
                <Button
                  label="Excluir"
                  className="btn btn-red btn-small"
                  onClick={() => handleDelete(item.id)}
                />
                <hr />
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
}

export default Admin;
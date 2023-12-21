import React, { useState, useEffect } from "react";
import './styles.css';
import Button from "../../components/Button/Button";
import { auth, db } from "../../config";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

function Admin(){
  const [taskInput, setTaskInput] = useState("")
  const [user, setUser] = useState({})
  const [todo, setTodo] = useState([])

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
            userUid: doc.data().userUid,
            task: doc.data().task,
          });
        });
        setTodo(list);
        console.log(list.join("| "));
      });

      // Clearing the subscription when the component is unmounted or when the condition changes
      return () => unsub();
    }
  }, []);



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
     try {
       await addDoc(collection(db, "tasks"), {
         task: taskInput,
         created: new Date(),
         userUid: user.uid,
       });
       console.log("tarefa criada");
       setTaskInput("");
     } catch (error) {
       console.error("Erro ao criar tarefa:", error);
     }
  }

  async function handleLogOut(){
    await signOut(auth)
  }

  return (
    <div className="container">
      <Button
        className="btn btn-logout btn-red"
        label="Sair"
        onClick={handleLogOut}
        />
      <h1>Minhas Tarefas</h1>

      {
        todo.map((item) => {
          return (
            <>
              <ul>
                <li>{item.task}</li>
                <li>
                  <Button label="concluído" className="btn" />
                  <Button label="excluir" className="btn btn-red" />
                </li>
              </ul>
            </>
          );
        })
      }
      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa ..."
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        ></textarea>
        <Button label="Criar Tarefa" className="btn btn-large" />
      </form>

    </div>
  );
}

export default Admin;
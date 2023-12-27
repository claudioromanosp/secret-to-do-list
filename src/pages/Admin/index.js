import React, { useState, useEffect } from "react";
import './styles.css';
import Button from "../../components/Button/";
import Loading from "../../components/Loading";
import { FaEdit, FaRegTrashAlt, FaSignOutAlt } from "react-icons/fa";
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
  doc,
  updateDoc
} from "firebase/firestore";

function Admin(){
  const [taskInput, setTaskInput] = useState("")
  const [user, setUser] = useState({})
  const [todo, setTodo] = useState([])
  const [feedback, setFeedback] = useState("Escreva a nova tarefa:")
  const [label, setLabel] = useState("Criar uma nova tarefa")
  const [edit, setEdit] = useState({})
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    if(taskInput === ""){
      setFeedback("Escreva sua tarefa !")
      setLoading(false)
      return;
    }
    if(edit?.id){
      handleUpdateTask()
      return
    }
     try {
       await addDoc(collection(db, "tasks"), {
         task: taskInput,
         created: new Date(),
         userUid: user.uid,
       });
       setFeedback("Escreva a nova tarefa:");
       setTaskInput("");
       setLabel("Criar uma nova tarefa");
       setLoading(false);
     } catch (error) {
      setFeedback("Não consegui criar a tarefa :(")
      setLoading(false)
      console.error("Erro ao criar tarefa:", error);
     }
  }

  async function handleLogOut(){
    await signOut(auth)
  }

  async function handleDelete(id) {
    setLoading(true)
    try {
       await deleteDoc(doc(db, "tasks", id));
       setLoading(false);
    } catch (error) {
      setLoading(false)
      setFeedback("Não consegui excluir a tarefa :(");
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  async function editTask (item) {
    console.log(item)
    setTaskInput(item.task)
    setEdit(item)
    setLabel("Salvar")
  }
  
  async function handleUpdateTask(item){
    setLoading(true)
     const docRef = doc(db, "tasks", edit?.id);
     try {
       await updateDoc(docRef, {
         task: taskInput,
       });
       setLabel("Criar uma nova tarefa");
       setTaskInput("");
       setEdit({});
       setLoading(false);
     } catch (error) {
      setLoading(false);
       console.error("Erro ao deletar tarefa:", error);
     } 
  }

  return (
    <div className="container-admin">
      <Button
        className="btn btn-logout btn-red"
        label={<FaSignOutAlt />}
        onClick={handleLogOut}
      />
      <h1>Minhas Tarefas</h1>
      {loading && <Loading />}
      <form className="form form-admin" onSubmit={handleRegister}>
        <p className="feedback">{feedback}</p>
        <textarea
          placeholder="Escreva aqui ..."
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        ></textarea>
        <Button label={label} className="btn btn-large" />
      </form>

      {todo.map((item) => {
        return (
          <>
            <ul className="list-tasks">
              <li key={item.id}>
                <p>{item.task}</p>
              </li>
              <li>
                <Button
                  label={<FaEdit />}
                  className="btn btn-small btn-first"
                  onClick={() => editTask(item)}
                />

                <Button
                  label="Excluir"
                  label={<FaRegTrashAlt />}
                  className="btn btn-red btn-small"
                  onClick={() => handleDelete(item.id)}
                />
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
}

export default Admin;
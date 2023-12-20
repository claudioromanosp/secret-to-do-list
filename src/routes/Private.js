import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";

function Private({ children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(true);
    useEffect(()=>{
        async function checkLogin(){
            await onAuthStateChanged(auth, (user) => {
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setLoading(false);
                    setSigned(true);
                    
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
        checkLogin();
    },[])
    if(loading){
        return (
          <div className="container">
            <h1>Loading ...</h1>
          </div>
        );
    }
    if (!signed) {
      return <Navigate to="/" />;
    }
    return children;
}

export default Private;
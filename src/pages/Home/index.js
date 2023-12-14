import React, { useState } from "react";


function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
return (
  <div className="container">
    <form className="form">
      <input type="text" name="email" value={email} onChange={inputEmail} />
      <input type="password" name="password" value={password} onChange={inputPassword} />
    </form>
  </div>
);
}

export default Home;
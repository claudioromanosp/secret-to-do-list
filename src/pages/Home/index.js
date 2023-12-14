import React, { useState } from "react";


function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function inputEmail(e){
        let input = e.target.value
        setEmail(input)
    }

    function inputPassword(e) {
      let input = e.target.value
      setPassword(input)
    }

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
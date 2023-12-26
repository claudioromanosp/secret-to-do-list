import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

function NotFound(){
return (
  <div className="container">

  <h1>404 | Essa página não existe</h1>
    <Link className="button-link" to="/">
      vá para Home
    </Link>
  </div>
);
}

export default NotFound;
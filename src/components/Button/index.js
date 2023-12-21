import React from 'react'

function Button({ onClick, label, className }) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
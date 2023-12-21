import React from 'react'

function Input({ onChange, label, className, name, type, value, placeholder }) {
  return (
    <input
    type={type} 
      className={className}
      name={name} 
      value={value} 
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;


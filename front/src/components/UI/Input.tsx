import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  containerClassName = 'input-group', 
  inputClassName = 'custom-input',    
  ...props
}) => {
  return (
    <div className={containerClassName}>
      {label && <label>{label}</label>}
      <input className={inputClassName} {...props} />
    </div>
  );
};

export default Input;

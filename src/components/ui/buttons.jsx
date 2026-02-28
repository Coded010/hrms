"use client";
import React from 'react';

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    soft: "btn-soft",
    link: "btn-link",
    disabled: "btn-disabled",
    error: "btn-error"
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
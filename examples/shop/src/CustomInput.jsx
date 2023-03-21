import React from 'react';

const CustomInput = ({ label, value, ...other }) => {
  const id = `filter-${value}`;

  return (
    <>
      <label for={id}>{label}</label>
      <input id={id} value={value} {...other} />
    </>
  )
}

export default CustomInput;
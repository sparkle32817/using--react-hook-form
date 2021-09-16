import React from "react";

import "./style.scss";

const Input = (props) => {
  const { name, type, value, error } = props;

  const handleChange = (e) => {
    props.onChange && props.onChange(e);
  };

  return (
    <div className="custom-input">
      <input name={name} type={type} value={value} onChange={handleChange} />
      {error && <span className="error">This field is required</span>}
    </div>
  );
};

export default Input;

import React, { useEffect, useState } from "react";

import "./style.scss";

const Checkbox = (props) => {
  const { value, label, error } = props;

  const [state, setState] = useState(0);

  useEffect(() => {
    value ? (value === "checked" ? setState(1) : setState(2)) : setState(0);
  }, [value]);

  const handleChange = () => {
    const _value = (state + 1) % 3;
    props.onChange &&
      props.onChange(
        _value === 0 ? "" : _value === 1 ? "checked" : "indeterminate",
      );

    setState(_value);
  };

  return (
    <div className="custom-checkbox" onClick={handleChange}>
      <div className="custom-checkbox--content">
        <span className="checkbox">
          {state ? (state === 1 ? "✅" : "❌") : ""}
        </span>
        <span className="label">{label}</span>
      </div>
      {error && <span className="custom-checkbox--error">This field is required</span>}
    </div>
  );
};

export default Checkbox;

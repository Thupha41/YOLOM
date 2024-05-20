import { useState, useRef } from "react";
import PropTypes from "prop-types";
import './FormInput.css'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    // Check validity when input loses focus
    if (!inputRef.current.validity.valid) {
      inputRef.current.setCustomValidity(errorMessage);
    } else {
      inputRef.current.setCustomValidity('');
    }

  };


  return (
    <div className={`formInput ${focused ? "focused" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        id={id}
        ref={inputRef}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* <span className="error">{errorMessage}</span> */}
      <span className="error">{errorMessage}</span>

    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number,
};

export default FormInput;

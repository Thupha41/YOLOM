import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ handleFilterChange, value, title, name, color, type = "checkbox", checked }) => {
    return (
        <label className="sidebar-label-container">
            <input onChange={handleFilterChange} type={type} value={value} name={name} checked={checked} />
            <span className="checkmark" style={{ backgroundColor: color }}></span>
            {title}
        </label>
    );
}

Input.propTypes = {
    handleFilterChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    checked: PropTypes.bool.isRequired,
}

export default Input;

import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PropTypes from 'prop-types';
const SamplePrevArrow = (props) => {
  const { onClick, disabled } = props;
  return (
    <div
      className={`w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2 ${disabled ? 'opacity-30 pointer-events-none' : ''}`}
      onClick={onClick}
    >
      <span className={`text-xl ${disabled ? 'pointer-events-none' : ''}`}>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};
SamplePrevArrow.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool.isRequired
  };


export default SamplePrevArrow;
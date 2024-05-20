import React from 'react';
import { BsChevronLeft } from "react-icons/bs";
import PropTypes from 'prop-types';

const PrevArrow = ({ onClick, disabled }) => {
  return (
    <div className={`absolute right-20 -top-[100px] ${disabled ? 'opacity-30' : ''}`} 
      onClick={onClick}>
      <div className={`bg-black h-[50px] w-[50px] rounded-full grid place-items-center bg-opacity-50 hover:bg-opacity-100 duration-300 cursor-pointer
        ${disabled ? 'bg-gray-800 pointer-events-none' : ''}`}>
        <BsChevronLeft color="white"/>
      </div>
    </div>
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

export default PrevArrow;

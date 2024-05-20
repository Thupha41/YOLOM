import React from 'react';
import { BsChevronRight } from "react-icons/bs";
import PropTypes from 'prop-types';

const NextArrow = ({ onClick, disabled }) => {
  return (
    <div className={`absolute right-0 -top-[100px] ${disabled ? 'opacity-30' : ''} `} onClick={onClick}>
      <div className={`bg-black h-[50px] w-[50px] rounded-full grid place-items-center bg-opacity-60 hover:bg-opacity-100 duration-300 cursor-pointer
        ${disabled ? 'bg-gray-800 pointer-events-none' : ''}`}>
        <BsChevronRight color="white" />
      </div>
    </div>
  );
};

NextArrow.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

export default NextArrow;

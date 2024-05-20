import React from "react";
import { BiCaretDown } from "react-icons/bi";
import PropTypes from 'prop-types'
const NavTitle = ({ title, icons, isOpen }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          <h3 className="font-semibold lg:text-xl text-black">{title}</h3>
          <BiCaretDown className={`transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </>
      ) : (
        <h3 className="font-bold lg:text-xl text-black">{title}</h3>
      )}
    </div>
  );
};

NavTitle.propTypes = {
    title: PropTypes.string,
    icons: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default NavTitle;
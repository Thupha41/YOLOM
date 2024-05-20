import React from 'react';
import PropTypes from 'prop-types';

const Button = ({content, onClick}) => {
  
    return (
        <div className="flex justify-center mb-20">
            <button 
                className="text-center font-semibold cursor-pointer mt-10 py-1 px-5 w-[300px] h-14 bg-white border border-black text-black hover:bg-black hover:text-white delay-150 ease-in-out transition-colors hover:-translate-y-1 hover:scale-110 duration-300 ..." 
                onClick={onClick}
            >
                {content}
            </button>
        </div>


    );
}

Button.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;

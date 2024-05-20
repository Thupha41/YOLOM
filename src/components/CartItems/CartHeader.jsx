import React from 'react'
import PropTypes from 'prop-types';

const CartHeader = ({ count }) => {
    return (
        <div className="bg-[#f9f9f9] text-[#333] pt-4 pr-6 border-b border-slate-300 flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-semibold">YOUR SHOPPING CART ({count} items)</h1>
        </div>
    );
};

CartHeader.propTypes= {
    count: PropTypes.number.isRequired,
}

export default CartHeader
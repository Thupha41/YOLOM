import React from 'react'
import PropTypes from 'prop-types'
const Products = ({ result, gridViewActive }) => {
    return (
      <>
        <section>
          <div className={`grid ${gridViewActive ? 'sm:grid-cols-2 lg:grid-cols-2': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {result}
          </div>



        </section>
      </>
    );
  };

Products.propTypes = {
    result: PropTypes.arrayOf(PropTypes.node).isRequired,
    gridViewActive: PropTypes.bool,
};

export default Products
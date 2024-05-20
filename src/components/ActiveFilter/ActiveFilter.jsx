import React from 'react';
import PropTypes from 'prop-types';

const ActiveFilter = ({ filters, removeFilter, clearFilters }) => {
    return (
        <div>
            {Object.keys(filters).flatMap(key => 
                filters[key].map(value => (
                    <div key={`${key}-${value}`}>
                        {`${key}: ${value}`}
                        <button onClick={() => removeFilter(key, value)}>X</button>
                    </div>
                ))
            )}
            <button onClick={clearFilters}>Clear All Filters</button>
        </div>
    );
};

ActiveFilter.propTypes = {
    filters: PropTypes.objectOf(PropTypes.array).isRequired,
    removeFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
};

export default ActiveFilter;

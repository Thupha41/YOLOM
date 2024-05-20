import React from 'react';
import PropTypes from 'prop-types';

const ActiveFilters = ({ filters, removeFilter, clearAll }) => {
    const renderFilter = (key, filterArray) => {
        if (Array.isArray(filterArray)) {  // Check if the filter is an array
            return filterArray.map((filter, index) => (
                <div key={`${key}-${index}`}>
                    {filter} <button onClick={() => removeFilter(key, filter)}>X</button>
                </div>
            ));
        }
        return null;  // Skip if not an array, handle other data types as needed
    };

    return (
        <div>
            {Object.keys(filters).map(key => renderFilter(key, filters[key]))}
            <button onClick={clearAll}>Delete all</button>
        </div>
    );
};

ActiveFilters.propTypes = {
    filters: PropTypes.shape({
        brands: PropTypes.arrayOf(PropTypes.string),
        colors: PropTypes.arrayOf(PropTypes.string),
        sizes: PropTypes.arrayOf(PropTypes.string),
        catalogue: PropTypes.arrayOf(PropTypes.string),
        tag: PropTypes.arrayOf(PropTypes.string),
        priceRange: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number
        })
    }).isRequired,
    removeFilter: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired
};

export default ActiveFilters;

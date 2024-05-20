import React from 'react';
import PropTypes from 'prop-types';
import Catalogue from './Catalogue/Catalogue';
import Sizes from './Sizes/Sizes';
import Colors from './Colors/Colors';
import Price from './Price/Price';
import Brands from './Brands/Brands';

const FilterComponent = ({ filters, handleFilterChange, removeFilter, clearFilters, checkedState, priceDisplayMap }) => {
  return (
    <div className="sticky pl-10 pr-0 top-0 z-10 p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] w-full">
        <div className='font-semibold text-2xl'>Filters</div>
        {/* Active Filters Display */}
        <div className="flex flex-wrap flex-col gap-2 p-2 w-72">
          {Object.keys(filters).map(filterType => (
            filters[filterType] && filters[filterType].map(value => (
              <span key={`${filterType}-${value}`} className="flex items-center rounded px-2 py-1 text-sm">
                  {filterType}: {filterType === 'price' ? priceDisplayMap[value] : value}
                  {filterType !== 'tag' && (
                    <button
                      onClick={() => removeFilter(filterType, value)}
                      className="bg-transparent hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded ml-2"
                    >
                      <span className="sr-only">Close menu</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
              </span>
            ))
          ))}
          

        </div>

        {/* Clear all buttons */}
        <div className='w-40 mb-4'>
          {Object.values(filters).some(filterArray => filterArray && filterArray.length > 0) && (
            <button
                onClick={clearFilters}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
                Clear All Filters
            </button>
          )}
        </div>

        {/* Brand section */}
        <div>
          <Brands handleFilterChange={handleFilterChange} checkedState={checkedState.brand} />
        </div>
        {/* Catalogue Section */}
        <div>
          <Catalogue handleFilterChange={handleFilterChange} checkedState={checkedState.catalogue}/>
        </div>
        {/* Size Section */}
        <div>
          <Sizes handleFilterChange={handleFilterChange} checkedState={checkedState.size}/>
        </div>
        {/* Colour Section */}
        <div>
          <Colors handleFilterChange={handleFilterChange} checkedState={checkedState.color}/>
        </div>
        {/* Price Range Section */}
        <div>
          <Price handleFilterChange={handleFilterChange} checkedState={checkedState.price}/>
        </div>
      </div>
    </div>
  );
};

FilterComponent.propTypes = {
    filters: PropTypes.object.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    checkedState: PropTypes.object.isRequired,
    priceDisplayMap: PropTypes.object.isRequired,
};

export default FilterComponent;

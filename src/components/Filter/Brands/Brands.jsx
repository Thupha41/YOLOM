import React, {useState} from 'react';
import Input from '../../Input/Input';
import { motion } from "framer-motion";
import './Brands.css'
import PropTypes from 'prop-types'
import NavTitle from '../NavTitle/NavTitle';
const Brands = ({ handleFilterChange, checkedState }) => {
  const brands = ['Mango', 'GAP', 'Levi\'s', 'Banana_Republic', 'Old Navy', 'O21_CTTT', 'Cotton On'];
  const [showBrands, setShowBrands] = useState(true);

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Brands" icons={true} isOpen={showBrands} />
      </div>
      
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands.map(brand => (
              <li
                key={brand}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300"
              >
                <Input
                  handleFilterChange={handleFilterChange}
                  value={brand}
                  title={brand}
                  name="brand"
                  checked={checkedState[brand] || false}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
      
    </div>
  );
};

Brands.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  checkedState: PropTypes.object.isRequired,
};
  
export default Brands;
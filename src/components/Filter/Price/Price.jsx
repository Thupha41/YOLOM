import React, {useState} from 'react';
import Input from "../../Input/Input";
import "./Price.css";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import NavTitle from '../NavTitle/NavTitle';
const Price = ({ handleFilterChange, checkedState }) => {
  const [showPrices, setShowPrices] = useState(true);
  return (
    <>
      <div>
        <div
          onClick={() => setShowPrices(!showPrices)}
          className="cursor-pointer"
        >
          <NavTitle title="Prices" icons={true} isOpen={showPrices} />
        </div>
        {showPrices && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300"
              >
                <Input
                  handleFilterChange={handleFilterChange}
                  value="1000000"
                  title="Under 1.000.000đ"
                  name="price"
                  type="radio"
                  checked={checkedState['1000000'] || false}
                />
              </li>
              <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300">
                <Input
                  handleFilterChange={handleFilterChange}
                  value="2000000"
                  title="1.000.000đ - 2.000.000đ"
                  name="price"
                  type="radio"
                  checked={checkedState['2000000'] || false}
                />
              </li>
              <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300">
                <Input
                  handleFilterChange={handleFilterChange}
                  value="3000000"
                  title="2.000.000đ - 3.000.000đ"
                  name="price"
                  type="radio"
                  checked={checkedState['3000000'] || false}
                />
              </li>
              <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300">
                <Input
                  handleFilterChange={handleFilterChange}
                  value="4000000"
                  title="3.000.000đ - 4.000.000đ"
                  name="price"
                  type="radio"
                  checked={checkedState['4000000'] || false}
                />
              </li>
              <li className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300">
                <Input
                  handleFilterChange={handleFilterChange}
                  value="4000001"
                  title="Over 4.000.000đ"
                  name="price"
                  type="radio"
                  checked={checkedState['4000001'] || false}
                />
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
};

Price.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  checkedState: PropTypes.object.isRequired
}

export default Price;
import React, {useState} from 'react';
import "./Colors.css";
import { motion } from "framer-motion";
import Input from "../../Input/Input";
import PropTypes from 'prop-types'
import NavTitle from '../NavTitle/NavTitle';
const Colors = ({ handleFilterChange, checkedState}) => {
  const colors = ['Black', 'Blue', 'Red', 'Purple', 'Pink', 'Brown', 'Beige', 'Green', 'Yellow', 'White'];
  const [showColors, setShowColors] = useState(true);
  return (
    <>
      <div>
        <div
          onClick={() => setShowColors(!showColors)}
          className="cursor-pointer"
        >
          <NavTitle title="Colors" icons={true} isOpen={showColors} />
        </div>

        {showColors && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              {colors.map(color => (
                <li key={color} className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300">
                  {color === 'White' ? (
                    <label className="sidebar-label-container">
                      <input
                        onChange={handleFilterChange}
                        type="checkbox"
                        value="White"
                        name="color"
                        checked={checkedState[color] || false}
                      />
                      <span
                        className="checkmark"
                        style={{ background: "white", border: "2px solid black" }}
                      ></span>
                      White
                    </label>
                  ) : (
                    <Input
                      handleFilterChange={handleFilterChange}
                      value={color}
                      title={color}
                      name="color"
                      color={color}
                      type="checkbox"
                      checked={checkedState[color] || false}
                    />
                  )}
                </li>
              ))} 
            </ul>
          </motion.div>
        )}
        
      </div>
    </>
  );
};

Colors.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  checkedState: PropTypes.object.isRequired,
}

export default Colors;
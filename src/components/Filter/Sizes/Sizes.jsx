import React, {useState} from 'react';
import Input from '../../Input/Input';
import { motion } from "framer-motion";
import "./Sizes.css"
import PropTypes from 'prop-types'
import NavTitle from '../NavTitle/NavTitle';
function Sizes({ handleFilterChange, checkedState }) {
    const sizes=["XS", "S", "M", "L", "XL"];
    const [showSizes, setShowSizes] = useState(true);
    return (
        <div>
            <div
                onClick={() => setShowSizes(!showSizes)}
                className="cursor-pointer"
            >
                <NavTitle title="Sizes" icons={true} isOpen={showSizes} />
            </div>
            {showSizes && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                        {sizes.map(size => (
                            <li
                                key={size}
                                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300"
                            >

                                <Input
                                    handleFilterChange={handleFilterChange}
                                    value={size}
                                    title={size}
                                    name="size"
                                    checked={checkedState[size] || false}
                                />
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}
  
  
Sizes.propTypes = {
    handleFilterChange: PropTypes.func.isRequired,
    checkedState: PropTypes.object.isRequired
}
  
export default Sizes;
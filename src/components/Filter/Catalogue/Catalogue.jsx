import React, { useState } from "react";
import Input from "../../Input/Input";
import "./Catalogue.css";
import PropTypes from "prop-types";
import NavTitle from "../NavTitle/NavTitle";
import { motion } from "framer-motion";
function Catalogue({ handleFilterChange, checkedState }) {
  const catalogues = [
    "Shirt",
    "T-Shirt",
    "Pants",
    "Jeans",
    "Jacket",
    "Short",
    "Sweater",
    "Sweatshirt",
    "Hoodie",
  ];
  const [showCatalogue, setShowCatalogue] = useState(true);
  return (
    <div>
      <div
        onClick={() => setShowCatalogue(!showCatalogue)}
        className="cursor-pointer"
      >
        <NavTitle title="Product Type" icons={true} isOpen={showCatalogue} />
      </div>
      {showCatalogue && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {catalogues.map((catalogue) => (
              <li
                key={catalogue}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-black hover:border-gray-400 duration-300"
              >
                <Input
                  handleFilterChange={handleFilterChange}
                  value={catalogue}
                  title={catalogue}
                  name="catalogue"
                  checked={checkedState[catalogue] || false}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

Catalogue.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  checkedState: PropTypes.object.isRequired,
};

export default Catalogue;

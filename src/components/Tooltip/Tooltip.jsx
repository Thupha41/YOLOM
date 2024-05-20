import React, { useState } from "react";
import PropTypes from "prop-types";
export const Tooltip = ({ position, content, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <div
          className="absolute z-10"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          style={{
            bottom: position === 'top' ? '100%' : undefined,
            top: position === 'bottom' ? '100%' : undefined,
            left: position === 'right' ? '100%' : position === 'left' ? undefined : '50%',
            right: position === 'left' ? '100%' : undefined,
            transform: ['top', 'bottom'].includes(position) ? 'translateX(-50%)' : 'translateY(-50%)',
          }}
        >
          <div className="bg-white text-black text-xs p-2 whitespace-nowrap rounded shadow-lg mt-2"
               style={{ cursor: 'default' }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

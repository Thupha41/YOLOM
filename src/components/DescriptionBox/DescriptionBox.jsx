import React from "react";
import PropTypes from "prop-types";

const DescriptionBox = ({ description }) => {
  // Convert newline characters to <br /> tags
  const formattedDescription = description.replace(/(?:\r\n|\r|\n)/g, "<br />");

  return (
    <div
      data-aos="fade-up"
      className="mt-[120px] mr-[170px] ml-[170px] mb-[80px]"
    >
      <div>
        <div className="flex">
          <div className="flex items-center justify-center text-[16px] font-semibold w-[170px] h-[70px] border border-solid border-[#d0d0d0]">
            Detailed Description
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[25px] border border-solid border-[#D0D0D0] p-12 pb-[70px]">
        {/* Use dangerouslySetInnerHTML to render the formatted description */}
        <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      </div>
    </div>
  );
};

DescriptionBox.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DescriptionBox;

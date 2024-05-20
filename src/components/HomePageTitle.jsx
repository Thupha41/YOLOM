import React from 'react';
import PropTypes from 'prop-types';
const HomePageTitle = ({ homeTitle, homeDescription }) => {
    return (
        <div className='inline-block'>
            <h2 data-aos="fade-up" className='text-5xl font-regular tracking-wide font-spartan' >
                {homeTitle}
            </h2>
            <p data-aos="fade-up" className='font-spartan text-base mt-2 font-light'>
                {homeDescription}
            </p>
        </div>
    );
};

HomePageTitle.propTypes = {
    homeTitle: PropTypes.string.isRequired,
    homeDescription: PropTypes.string.isRequired,

}

export default HomePageTitle;

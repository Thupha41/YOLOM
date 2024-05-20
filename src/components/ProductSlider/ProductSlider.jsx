import React, { useState, useEffect, useContext, useMemo } from 'react';
import Slider from "react-slick";
import NextArrow from '../Arrows/NextArrow';
import PrevArrow from '../Arrows/PrevArrow';
import CardItem from '../CardItem/CardItem';
import HomePageTitle from '../HomePageTitle';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import './ProductSlider.css'
const ProductSlider = (props) => {

    const {all_product} = useContext(ShopContext);
    const [slidesToShow, setSlidesToShow] = useState(4);
    const [canNext, setCanNext] = useState(true);
    const [canPrev, setCanPrev] = useState(false);


    const filteredProducts = useMemo(() => all_product.filter(el => el.Product.Tag.name === props.Tag).slice(0, 8), [all_product, props.Tag]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 1000) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };
        handleResize(); 

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const settings = {
        arrows: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <NextArrow disabled={!canNext} />,
        prevArrow: <PrevArrow disabled={!canPrev} />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1
                }
            },
        ],
    };

    const handleSlideChange = (index) => {
        let maxSlidesToShow;
        if (window.innerWidth >= 1280) {
            maxSlidesToShow = 3;
        } else if (window.innerWidth >= 1000) {
            maxSlidesToShow = 2;
        } else {
            maxSlidesToShow = 1;
        }

        let lastSlideIndexToShow = index + maxSlidesToShow;
        setCanPrev(index !== 0);
        setCanNext(lastSlideIndexToShow < 8); 
    };

    return (
        
        <div className='product-slider mt-20 mb-10'>
            <div>
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <HomePageTitle
                        homeTitle={props.homeTitle}
                        homeDescription={props.homeDescription}
                    />
                </div>
                <div data-aos="fade-up" className="max-w-screen-2xl mx-auto container xl:px-28 px-4 pt-28">
                    <Slider {...settings} afterChange={handleSlideChange} key={filteredProducts.length}>
                        {filteredProducts.map((el) => (

                            <CardItem
                                key={el.sku_id}
                                sku_slug={el.sku_slug}
                                id={el.product_id}
                                thumbnail={el.sku_image}
                                name={el.Product.product_name}
                                brand={el.Product.Brand.name}
                                current_unit_price={el.Product.product_price}
                                oldPrice={el.oldPrice || ''}
                                labelType={el.Product.Tag.label}
                                rating={el.Product.product_rating}
                            />

                                         
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

ProductSlider.propTypes = {
    homeTitle: PropTypes.string.isRequired,
    homeDescription: PropTypes.string.isRequired,
    Tag: PropTypes.oneOf(['New Arrival', 'Sale', 'default']).isRequired,
};

export default ProductSlider;

import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'; 
import bannerImg4 from '../../assets/slidingImg/bannerImg4.png';
import bannerImg5 from '../../assets/slidingImg/bannerImg5.png';
import bannerImg6 from '../../assets/slidingImg/bannerImg6.png';
import bannerImg7 from '../../assets/slidingImg/bannerImg7.png';
import bannerImg8 from '../../assets/slidingImg/bannerImg8.png';

const slidesData = [
    { id: "001", img: bannerImg4, link: "/link1" },
    { id: "002", img: bannerImg5, link: "/link2" },
    { id: "003", img: bannerImg6, link: "/link3" },
    { id: "004", img: bannerImg7, link: "/link4" },
    { id: "005", img: bannerImg8, link: "/link5" },
];

const SliderBanner = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
        swipeToSlide: true, // Enable swipe to slide
        touchMove: true, // Enable touch move
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                },
            },
        ],
    };

    return (
        <div className="relative overflow-hidden">
            <Slider {...settings}>
                {slidesData.map((data) => (
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="300"
                        key={data.id}
                    >
                        {/* Wrap image inside Link */}
                        <Link to={data.link} onMouseDown={(e) => e.stopPropagation()}>
                            <img
                                src={data.img}
                                alt=""
                                className="w-full h-auto"
                            />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderBanner;

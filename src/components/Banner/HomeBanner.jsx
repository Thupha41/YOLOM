import React from 'react'
import Slider from "react-slick";
import bannerImg1 from '../../assets/slidingImg/bannerImg1.png'
import bannerImg2 from '../../assets/slidingImg/bannerImg2.png'
import bannerImg3 from '../../assets/slidingImg/bannerImg3.png'
const slidesData = [
    {
        id: "001",
        img: bannerImg1,
        title: "Finde Premium Branding Products",
        description: "Sale up to 50%",
        btn: "SHOP NOW",
    },
    {
        id: "002",
        img: bannerImg3,
        title: "NEW ARRIVALS - BANNA REPUBLIC",
        description: "What you wear is how you present yourself to the world, especially today. Fashion is instant language",
        btn: "FIND OUT NOW",
    },
    {
        id: "003",
        img: bannerImg2,
        title: "HELLO SEMESTER VI",
        description: "If you tired of so many projects, fuck it and buy some new clothes",
        btn: "SHOP NOW",
    },

    {
        id: "003",
        img: bannerImg2,
        title: "HELLO SEMESTER VI",
        description: "If you are tired of so many projects, fuck it and buy some new clothes",
        btn: "SHOP NOW",
    },
];

const HomeBanner = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
    return (
        <div className="sliding relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-banner flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
            {/* background*/}
            <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
            {/* sliding section */}
            <div className="container pb-8 sm:pb-0">
        
                <Slider {...settings}>
                    {slidesData.map((data) => (
                        <div key={data.id}>
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {/* text content section */}
                                    <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                                        >
                                            {data.title.includes("BANNA REPUBLIC") 
                                                ? <>
                                                    NEW ARRIVALS - <span className="text-custom-color">BANNA REPUBLIC</span>
                                                </>
                                                : data.title
                                            }
                                        </h1>
                                        <p
                                            data-aos="fade-up"
                                            data-aos-duration="500"
                                            data-aos-delay="100"
                                            className="text-lg sm:text-xl"
                                        >
                                            {data.description}
                                        </p>
                                        <div
                                            data-aos="fade-up"
                                            data-aos-duration="500"
                                            data-aos-delay="300"
                                        >
                                            <button
                                                onClick={alert}
                                                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                                            >
                                                {data.btn}
                                            </button>
                                        </div>
                                    </div>
                                    {/* image section */}
                                    <div className="order-1 sm:order-2">
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-once="true"
                                            className="relative z-10"
                                        >
                                            <img
                                            src={data.img}
                                            alt=""
                                            className="w-[300px] h-[300px] sm:h-[600px] sm:w-[600px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    ))}

                        
                </Slider>
                
            </div>
        </div>
    )
}

export default HomeBanner
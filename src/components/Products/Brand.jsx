import React from 'react'
import Banna_Republic_logo  from '../../assets/brandImg/Banana_Republic_logo.png'
import mango_logo from '../../assets/brandImg/mango_logo.jpg'
import cotton_on_logo from '../../assets/brandImg/cotton_on_logo.png'
import Old_Navy_logo from '../../assets/brandImg/Old_Navy_logo.png'
import Gap_logo from '../../assets/brandImg/Gap_logo.png'
import levis_logo from '../../assets/brandImg/levis_logo.png'
import Frame1 from '../../assets/brandImg/Frame1.png'
import Frame2 from '../../assets/brandImg/Frame2.png'
import Frame3 from '../../assets/brandImg/Frame3.png'
import Frame4 from '../../assets/brandImg/Frame4.png'
import Frame5 from '../../assets/brandImg/Frame5.png'
import Frame6 from '../../assets/brandImg/Frame6.png'
import Frame7 from '../../assets/brandImg/Frame7.png'
import Marquee from "react-fast-marquee";
import HomePageTitle from '../HomePageTitle'
const brandLogo = [
    {
        id: 1,
        img: Banna_Republic_logo,
    },
    {
        id: 2,
        img: mango_logo,
    },
    {
        id: 3,
        img: cotton_on_logo,
    },

    {
        id: 4,
        img: Old_Navy_logo,

    },

    {
        id: 5,
        img: Gap_logo,
    },

    {
        id: 6,
        img: levis_logo,
    }

    

]


const Brand = () => {
  return (
    <div className='max-w-screen-2x1 mx-auto container xl:px-28 px-4 py-20'>
        {/* Title section */}
        <div className='text-center mb-12'>
            <HomePageTitle
                homeTitle="Featured Brands"
                homeDescription="Browse from the world&apos;s best brands"
            />
        </div>
        {/* Brand Image */}
        <section className='marque-wrapper py-5'>
            <div className ='container-2xl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='marquee-inner-wrapper bg-white p-3'>
                            <Marquee className='d-flex'>
                                <div data-aos="fade-up" className='flex items-center justify-around flex-wrap gap-4 py-5 mx-4 w-25'>
                                    {
                                        brandLogo.map(({id, img}) => (
                                            <div key={id}>
                                                <img src={img} alt="" style={{ width: '200px', height: '110px' }}/>
                                            </div>
                                    ))}
            
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Brand Collections Grid */}
        <div data-aos="fade-up" className='mt-2 flex flex-col md:flex-row items-center gap-2'>
            <div className='w-full md:w-1/2'>
                <div className='mb-5 grid grid-cols-1 gap-2'>
                    <img src={Frame1} alt="" className='w-full hover:scale-105 transition-all duration-200 ' />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-2 gap-2'>
                    <img src ={Frame6} alt="" className='w-full hover:scale-105 transition-all duration-200'/>
                    <img src ={Frame7} alt="" className='w-full hover:scale-105 transition-all duration-200'/>
                </div>

            </div>

            <div className='md:w-1/2'>
                <div className='grid grid-cols-2 gap-2'>
                    <img src ={Frame2} alt="" className='w-full hover:scale-105 transition-all duration-200'/>
                    <img src ={Frame3} alt="" className='w-full hover:scale-105 transition-all duration-200'/>
                    <img src ={Frame4} alt="" className='w-full hover:scale-105 transition-all duration-200'/>
                    <img src ={Frame5} alt="" className='w-full hover:scale-105 transition-all duration-200'/>


                </div>
            </div>
        </div>
    </div>
  )
}

export default Brand
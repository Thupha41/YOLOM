import React from 'react'

const DescriptionBox = () => {
  return (
    <div data-aos="fade-up" className='mt-[120px] mr-[170px] ml-[170px] mb-[80px]'>
        <div>
            <div className='flex'>
                <div className='flex items-center justify-center text-[16px] font-semibold w-[170px] h-[70px] border border-solid border-[#d0d0d0]'>
                    Detailed Description
                </div>
                <div className='flex items-center justify-center text-[16px] font-semibold w-[170px] h-[70px] border border-solid border-[#d0d0d0]'>
                    Brand Description
                </div>
                <div className='bg-[#FBFBFB] text-[#555] flex items-center justify-center text-[16px] font-semibold w-[170px] h-[70px] border border-solid border-[#d0d0d0]'
                >
                    Reviews (122)
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-[25px] border border-solid border-[#D0D0D0] p-12 pb-[70px]'>
            <p>
            Banana Republic is an American fashion brand established in 1978 by Mel and Patricia Ziegler in California. The brand is currently owned by the GAP Inc and distributed by the European Fashion and Cosmetics Company (YOLOM) in Vietnam since 2012. Banana Republic offers a diverse range of designs, blending classic beauty with contemporary trends. Through meticulous designs, we provide meticulously crafted clothing and accessories made from premium materials. Banana Republic aims to beautify both men and women who exude positive energy and seek opportunities and new experiences. We always see the difference in life. With a liberal spirit, Banana Republic offers you simple, elegant designs that are equally sophisticated, suitable for all lifestyles in busy lives.
            </p>
        </div>

    </div>
  )
}

export default DescriptionBox
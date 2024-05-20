import React from 'react'
import blog1 from '../../assets/blog/Thumbnail-blog-quan-linen-cho-nam.png'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (
    <div className='w-1/4'>
        <div className='bg-white rounded-[10px]'>
            {/* Blog image */}
            <div className='rounded-tl-[10px] rounded-tr-[10px]'>
                <img src={blog1} alt='blog1' className='max-w-full h-auto'/>
            </div> 
            {/* Blog content */}
            <div className='p-4'>
                <p className='text-xs leading-6 uppercase tracking-normal font-normal p-0'>
                    1, May, 2024
                </p>
                <h5 className='text-[18px] text-[#131921]'>How to choose the right linen pants for men?</h5>
                <p className='text-xs leading-5 text-[#777] '>Chọn quần linen phù hợp không chỉ có thể thỏa được yếu tố về vẻ ngoài hấp dẫn, mà còn phải đảm bảo sự...</p>
                <Link to='/blog'><button className='bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-black rounded mt-5'>Read more</button></Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard
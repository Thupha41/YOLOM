import React from 'react'
import BlogCard from './BlogCard'
import HomePageTitle from '../HomePageTitle'
const BlogHomePage = () => {

  return (
    <section className='max-w-screen-2x1 mx-auto container xl:px-28 px-4 py-20'>
        {/* Title section */}
        <div className='text-center mb-12'>
            <HomePageTitle
                homeTitle="Blogs"
                homeDescription="Explore our latest blogs"
            />
        </div>
        <div className='container-2xl'>
            <div className='flex flex-row'>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>

            </div>
        </div>
    </section>
  )
}

export default BlogHomePage
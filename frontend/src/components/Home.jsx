import React from 'react'
import Banner from './Banner'
import BlogsSlider from './BlogsSlider'

import '../styles/Animation.css'
import PopularCategory from './PopularCategory'
import Footer from './Footer'

const Home = () => {
    return (
        <>
            <Banner className='animate-flip-up' />
            <BlogsSlider className='animate-flip-up' />
            <PopularCategory className='animate-flip-up' />
            <Footer className='animate-fade-in-up'/>
        </>
    )
}

export default Home
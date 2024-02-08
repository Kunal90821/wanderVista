import React from 'react'
import Banner from './Banner'
import BlogsSlider from './BlogsSlider'

import '../styles/Animation.css'

const Home = () => {
    return (
        <>
            <Banner className='animate-flip-up' />
            <BlogsSlider className='animate-flip-up' />
        </>
    )
}

export default Home
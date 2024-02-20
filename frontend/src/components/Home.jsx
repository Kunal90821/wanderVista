import Banner from './Banner'
import BlogsSlider from './BlogsSlider'
import PopularCategory from './PopularCategory'
import Footer from './Footer'

import '../styles/Animation.css'
import '../styles/styles.css'

const Home = () => {
    return (
        <>
            <Banner />
            <BlogsSlider />
            <PopularCategory />
            <Footer />
        </>
    )
}

export default Home
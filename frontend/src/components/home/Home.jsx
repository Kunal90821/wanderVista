import Banner from './Banner'
import BlogsSlider from './BlogsSlider'
import PopularCategory from './PopularCategory'


import '../../styles/Animation.css'
import '../../styles/styles.css'

const Home = () => {
    return (
        <>
            <Banner />
            <BlogsSlider />
            <PopularCategory />
        </>
    )
}

export default Home
import '../styles/Banner.css';
import '../styles/Animation.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
    <main className="main bg-white ml-2 lg:ml-6 shadow-lg">
        <section className="section banner banner-section">
            <div className="container banner-column">
                <img className="banner-image animate-fade-in-right hover:animate-zomm-in" src="/static/images/banner.png" alt="banner" />
                <div className="banner-inner">
                    <h1 className="heading-xl animate-fade-in-left">Wander. Write. Share. Explore.</h1>
                    <p className="paragraph animate-fade-up-delay text-gray-700">
                    Explore with words. Write tales. Share wonders. Wander imaginatively.
                    </p>
                    <Link className="btn btn-darken btn-inline animate-fade-up-delay" to='/all-blogs'>
                    Check Out All Blogs<i className="bx bx-right-arrow-alt"></i>
                    </Link>
                </div>
            </div>
        </section>
    </main>
    )
}

export default Banner
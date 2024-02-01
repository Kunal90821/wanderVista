import '../styles/Banner.css';

const Banner = () => {
    return (
    <main className="main bg-black text-white">
        <section className="section banner banner-section">
            <div className="container banner-column">
                <img className="banner-image" src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="banner" />
                <div className="banner-inner">
                    <h1 className="heading-xl">Experience Media Like Never Before</h1>
                    <p className="paragraph">
                    Enjoy award-winning stereo beats with wireless listening freedom and sleek,
                    streamlined with premium padded and delivering first-rate playback.
                    </p>
                    <button className="btn btn-darken btn-inline">
                    Our Products<i className="bx bx-right-arrow-alt"></i>
                    </button>
                </div>
            </div>
        </section>
    </main>
    )
}

export default Banner
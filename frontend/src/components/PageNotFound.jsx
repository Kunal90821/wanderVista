import '../styles/PageNotFound.css'

const PageNotFound = () => {
    return (
    <div className='main'>
        <nav className="shelf">
            <a className="book home-page">Home page</a>
            <a className="book about-us">About us</a>
            <a className="book contact">Contact</a>
            <a className="book faq">F.A.Q.</a>
            
            <span className="book not-found"></span>
            
            <span className="door left"></span>
            <span className="door right"></span>
        </nav>
        <h1>Error 404</h1>
        <p>The page you&#39;re loking for can&#39;t be found</p></div>
    )
};

export default PageNotFound;
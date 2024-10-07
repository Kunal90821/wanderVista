import React from 'react'
import { Link } from 'react-router-dom';
import './Card.css'
import '../../styles/Animation.css';

const Card = () => {
    return (
        <div className="text-gray-600 mt-11 ml-8 body-font">
            <div className="container px-5 mx-auto">
                <div className="flex flex-wrap justify-evenly">
                    <div className="p-4 md:w-2/5">
                        <div className="h-full rounded-xl bg-white overflow-hidden shadow-lg animate-flip-x">
                            <img
                                className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-300 hover:scale-100"
                                src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                                alt="blog"
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-semibold text-gray-400 mb-1">
                                    CATEGORY-1
                                </h2>
                                <h1 className="title-font text-lg font-semibold text-gray-600 mb-3">
                                    The Catalyzer
                                </h1>
                                <p className="leading-relaxed mb-3">
                                    Photo booth fam kinfolk cold-pressed sriracha leggings
                                    jianbing microdosing tousled waistcoat.
                                </p>
                                <div className="flex items-center flex-wrap ">
                                    <div className="Arrowlink Arrowlink--arrowed font-semibold">
                                        <Link to='/blog-post'>
                                            Read More
                                            <svg
                                                className="arrowLink-iconLink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 32 32"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#ff215a"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                >
                                                    <circle
                                                        className="arrowLink-iconLink--circleLink"
                                                        cx="16"
                                                        cy="16"
                                                        r="15.12"
                                                    ></circle>
                                                    <path
                                                        className="arrowLink-iconLink--arrowLink"
                                                        d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-2/5">
                        <div className="h-full rounded-xl bg-white overflow-hidden shadow-lg animate-flip-x">
                            <img
                                className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-300 hover:scale-100"
                                src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                                alt="blog"
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-semibold text-gray-400 mb-1">
                                    CATEGORY-1
                                </h2>
                                <h1 className="title-font text-lg font-bold text-gray-600 mb-3">
                                    The Catalyzer
                                </h1>
                                <p className="leading-relaxed mb-3">
                                    Photo booth fam kinfolk cold-pressed sriracha leggings
                                    jianbing microdosing tousled waistcoat.
                                </p>
                                <div className="flex items-center flex-wrap ">
                                    <div className="Arrowlink Arrowlink--arrowed">
                                        <Link to='/blog-post'>
                                            Read More
                                            <svg
                                                className="arrowLink-iconLink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 32 32"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#ff215a"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                >
                                                    <circle
                                                        className="arrowLink-iconLink--circleLink"
                                                        cx="16"
                                                        cy="16"
                                                        r="15.12"
                                                    ></circle>
                                                    <path
                                                        className="arrowLink-iconLink--arrowLink"
                                                        d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-2/5">
                        <div className="h-full rounded-xl bg-white overflow-hidden shadow-lg animate-flip-x">
                            <img
                                className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-300 hover:scale-100"
                                src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                                alt="blog"
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                    CATEGORY-1
                                </h2>
                                <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                                    The Catalyzer
                                </h1>
                                <p className="leading-relaxed mb-3">
                                    Photo booth fam kinfolk cold-pressed sriracha leggings
                                    jianbing microdosing tousled waistcoat.
                                </p>
                                <div className="flex items-center flex-wrap ">
                                    <div className="Arrowlink Arrowlink--arrowed">
                                        <Link to='/blog-post'>
                                            Read More
                                            <svg
                                                className="arrowLink-iconLink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 32 32"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#ff215a"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                >
                                                    <circle
                                                        className="arrowLink-iconLink--circleLink"
                                                        cx="16"
                                                        cy="16"
                                                        r="15.12"
                                                    ></circle>
                                                    <path
                                                        className="arrowLink-iconLink--arrowLink"
                                                        d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card
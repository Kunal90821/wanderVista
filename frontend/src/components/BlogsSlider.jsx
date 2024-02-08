import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax, Pagination } from 'swiper/modules';

import "swiper/swiper-bundle.css";

import '../styles/BlogsSlider.css';
import '../styles/Animation.css';

const BlogsSlider = () => {

    return (
        <Swiper
        modules={[Autoplay, Parallax, Navigation, Pagination]}
        parallax={true}
        slidesPerView={'auto'}
        speed={1200}
        autoplay={{
            delay:5000,
            disableOnInteraction: false,
        }}
        direction='vertical'
        navigation={{
            prevEl: '.prev-button',
            nextEl: '.next-button'
        }}
        pagination={{ 
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>';
            },
        }}
        className='mySwiper2 swiper-container lg:ml-0 -ml-4 lg:w-[100%] w-[103%]'
        >
            <SwiperSlide>
                <div className="main lg:h-screen h-[50%] relative bg-white mt-4 ml-6">
                    <div className="relative lg:w-[60%] lg:left-[32%] lg:top-20 object-cover left-[5%] w-[88%] top-[6%] ">
                        <img src="https://picsum.photos/id/1011/1200/800" />
                    </div>
                    <div className='content relative lg:-top-[40%] -top-[30%] lg:left-[12%] left-[5%] lg:w-[40%] w-[88%] lg:text-base text-sm lg:h-[35%] h-[38%]'>
                        <h3 className='heading lg:text-5xl text-sm'>we help you make modern interior</h3>
                        <div>
                            <p>
                                we will help you to make an elegant and luxurius interrior designed by porfessional interrior designer.
                            </p>
                        </div>
                        <div className='link link--arrowed'>
                            <a href='#'>Read More
                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                    <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                        <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                        <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                    </g>
                                </svg>    
                            </a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="main lg:h-screen h-[50%] relative bg-white mt-4 ml-6">
                    <div className="relative lg:w-[60%] lg:left-[32%] lg:top-20 object-cover left-[5%] w-[88%] top-[6%] ">
                        <img src="https://picsum.photos/id/1026/1200/800" />
                    </div>
                    <div className='content relative lg:-top-[40%] -top-[30%] lg:left-[12%] left-[5%] lg:w-[40%] w-[88%] lg:text-base text-sm lg:h-[35%] h-[38%]'>
                        <h3 className='heading lg:text-5xl text-sm'>we help you make modern interior</h3>
                        <div>
                            <p>
                                we will help you to make an elegant and luxurius interrior designed by porfessional interrior designer.
                            </p>
                        </div>
                        <div className='link link--arrowed'>
                            <a href='#'>Read More
                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                    <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                        <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                        <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                    </g>
                                </svg>    
                            </a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="main lg:h-screen h-[50%] relative bg-white mt-4 ml-6">
                    <div className="relative lg:w-[60%] lg:left-[32%] lg:top-20 object-cover left-[5%] w-[88%] top-[6%] ">
                        <img src="https://picsum.photos/id/201/1200/800" />
                    </div>
                    <div className='content relative lg:-top-[40%] -top-[30%] lg:left-[12%] left-[5%] lg:w-[40%] w-[88%] lg:text-base text-sm lg:h-[35%] h-[38%]'>
                        <h3 className='heading lg:text-5xl text-sm'>we help you make modern interior</h3>
                        <div>
                            <p>
                                we will help you to make an elegant and luxurius interrior designed by porfessional interrior designer.
                            </p>
                        </div>
                        <div className='link link--arrowed'>
                            <a href='#'>Read More
                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                    <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                        <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                        <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                    </g>
                                </svg>    
                            </a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="main lg:h-screen h-[50%] relative bg-white mt-4 ml-6">
                    <div className="relative lg:w-[60%] lg:left-[32%] lg:top-20 object-cover left-[5%] w-[88%] top-[6%] ">
                        <img src="https://picsum.photos/id/167/1200/800" />
                    </div>
                    <div className='content relative lg:-top-[40%] -top-[30%] lg:left-[12%] left-[5%] lg:w-[40%] w-[88%] lg:text-base text-sm lg:h-[35%] h-[38%]'>
                        <h3 className='heading lg:text-5xl text-sm'>we help you make modern interior</h3>
                        <div>
                            <p>
                                we will help you to make an elegant and luxurius interrior designed by porfessional interrior designer.
                            </p>
                        </div>
                        <div className='link link--arrowed'>
                            <a href='#'>Read More
                                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                    <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                        <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                        <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                    </g>
                                </svg>    
                            </a>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <div className='prev-button navigation lg:left-[88%] lg:top-[12%] left-[81%] top-[15%]'>
                <a href='#' className='link link--arrowed'>
                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                        <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                            <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                            <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                        </g>
                    </svg>
                </a>
            </div>
            <div className='next-button navigation lg:left-[88%] lg:top-[19%] left-[81%] top-[22%]'>
                <a href='#' className='link link--arrowed'>
                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                        <g fill="none" stroke="#ff215a" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                            <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                            <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                        </g>
                    </svg>
                </a>
            </div>
        </Swiper>
    );
}

export default BlogsSlider;
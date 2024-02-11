import React, { useState } from "react";
import Layout from "../../Layouts/Layout/Layout";
import LandingPage from "./LandingPage/LandingPages";
import Services from "./ourservice/Services";
import BlogCard from "../../Components/BlogCard.js/BlogCard";
import "./Homepage.css";  
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import ProductCard from "../../Components/ProductCard/ProductCard";
import TopDeals from "../../Components/TopDeals/TopDeals";

const Homepage = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    return (
        <  >
            <Layout>
                <LandingPage />
                <Services />
                <section className="homeContainer">
                    <p className="pl-1 text-center md:text-left blogMainHead ">Top deals</p>
                    <Swiper
                        onSwiper={setSwiperRef}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        style={{
                            "--swiper-navigation-color": "red",
                            "--swiper-navigation-size": "25px",
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1300: {
                                slidesPerView: 5
                            }
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper "
                    >
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                        <SwiperSlide ><TopDeals /></SwiperSlide>
                       
                    </Swiper>
                </section>
                <section className="homeContainer ">
                    <p className="pl-1 text-center md:text-left blogMainHead ">Popular Product</p>
                    <Swiper
                        onSwiper={setSwiperRef}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        style={{
                            "--swiper-navigation-color": "red",
                            "--swiper-navigation-size": "25px",
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1300: {
                                slidesPerView: 5
                            }
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper "
                    >
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                        <SwiperSlide ><ProductCard /></SwiperSlide>
                    </Swiper>
                </section>
                <section className="homeContainer ">
                    <p className="pl-1 text-center md:text-left blogMainHead ">Marketooze Blogs</p>
                    <Swiper
                        onSwiper={setSwiperRef}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        style={{
                            "--swiper-navigation-color": "red",
                            "--swiper-navigation-size": "25px",
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1300: {
                                slidesPerView: 5
                            }
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper "
                    >
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                        <SwiperSlide ><BlogCard /></SwiperSlide>
                    </Swiper>
                </section>
            </Layout>
        </>
    );
};

export default Homepage;

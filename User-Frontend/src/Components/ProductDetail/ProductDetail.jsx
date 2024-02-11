import "./ProductDetail.css";
import Layout from "../../Layouts/Layout/Layout.js";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { HiMiniMinus } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Button from "../Button/Button.jsx";
import { IoIosShareAlt } from "react-icons/io";
import { RWebShare } from "react-web-share";
import ProductCard from "../ProductCard/ProductCard.jsx";
const ProductDetail = () => {
    const [swiperRef, setSwiperRef] = useState(null);
  const img = [
    {
      id: 1,
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/f/a/l/-original-imaghhfdxwteb3nd.jpeg?q=70&crop=false",
    },
    {
      id: 2,
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/m/x/w/m-jc23-rn-fs-black-gry-arizona-jump-cuts-original-imagx2yac6mqrreq.jpeg?q=70&crop=false",
    },
    {
      id: 3,
      url: "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/o/t/9/xl-jc23-hd-fs-black-gry-arizona-jump-cuts-original-imaguy4pr75suest.jpeg?q=70&crop=false",
    },
  ];
  const [productImg, setProductImg] = useState(img[0].url);
  const [itemQuantity, setItemQuantity] = useState(1);
  return (
    <>
      <Layout>
        <section className="pdTopSection w-[screen] md:flex-row flex-col justify-center items-start   ">
          <div className="pdAllImgCont w-[100%] md:w-1/3">
            <div className="pdImgCont md:p-5 ">
              <img src={productImg} alt="" className="pdImg" />
            </div>

            <div className="pdSmallImgCont">
              {img.map((item) => (
                <div
                  onClick={() => setProductImg(item.url)}
                  className={`pdSmallImgBorder ${
                    productImg === item.url ? "selected" : ""
                  }`}
                >
                  <img src={item.url} alt="" className="pdSmallImg " />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[100%] mt-3 md:mt-0 md:w-1/2 pdDetailContainer md:ml-4">
            <p className="pdName">Lorem ipsum dolor sit amet.</p>
            <div className="hidden pdAvailable md:flex md:flex-row">
              <p>Available:</p>
              <p className="pdStock">In Stock</p>
            </div>
            <div className="pdProductPrice">
              <p>₹225</p>
            </div>
            <div className="pdRating">
              <ReactStars
                edit={false}
                count={5}
                value={4.5}
                size={20}
                activeColor="#FFA534"
                isHalf={true}
              />
              <p>&nbsp;4.5</p>
              <p className="pdNumRating">&nbsp;112 ratings</p>
            </div>
            <div className="pdAllColor">
              <p className="pdSmallHead">Colors:</p>
              <div className="pdColorOuter border-2    border-[red]  ">
                <div className="bg-[red] pdColorDiv "></div>
              </div>
            </div>
            <div className="pdSize">
              <p className="pdSmallHead">Select size:</p>
              <select
                className="pdItemDropDown"
                //   value={itemColor}
                //   onChange={(e) => setItemColor(e.target.value)}
              >
                <option value="option1">S</option>
                <option value="option2">XL</option>
              </select>
              <div className="flex flex-row ml-8">
                <p className="pdSmallHead">Quantity:</p>
                <div className="pdItemQuantity">
                  <span
                    onClick={() =>
                      setItemQuantity((prevQuantity) =>
                        Math.max(1, prevQuantity - 1)
                      )
                    }
                  >
                    <HiMiniMinus className="redIcon" />
                  </span>
                  <span className="cartItemQuantityValue">{itemQuantity}</span>{" "}
                  <span onClick={() => setItemQuantity(itemQuantity + 1)}>
                    <IoAdd className="greenIcon" />
                  </span>
                </div>
              </div>
            </div>
            <div className="pdDescription">
              <p className="pdSmallHead">Description:</p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
              impedit, laudantium, quaerat dignissimos nulla ducimus aliquam
              magni porro aut nihil maxime itaque culpa quam explicabo a
              sapiente earum, iste cumque minima labore similique fugit
              voluptate. Accusantium, illum, iste atque dolores obcaecati maxime
              aliquid quidem quod vel repudiandae aperiam laboriosam commodi ex
              non explicabo sed perferendis nihil culpa saepe
            </div>
            <div className="hidden pdCartBuy md:flex md:flex-row md:items-center md:block">
              <Button widthButton={"150px"} title={"Buy Now"} />
              <Button widthButton={"150px"} title={"Add to Cart"} />
              <RWebShare
                data={{
                  text: "Fashion Fusion",
                  url: window.location.href,
                  title: "Fashion Fusion",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <p className="pdShare">
                  Share
                  <IoIosShareAlt />
                </p>
              </RWebShare>
            </div>
            <div className="fixed bottom-0 left-0 flex flex-row w-[100%] pdCartBuy md:hidden">
              <p className="w-1/2 pdbuttonCart">Add to cart</p>
              <p className="w-1/2 pdbuttonBuy">Buy Now</p>
            </div>
            <div className="pdSeller">
              <p className="pdSmallHead">
                Seller: <span className="sellerName">Vishal</span>
              </p>
              <p>100% Original Products</p>
              <p> Pay on delivery might be available</p>
              <p> Easy 14 days returns and exchanges</p>
              <p> Try & Buy might be available</p>
            </div>
            <div className="pdSeller">
              <p className="pdSmallHead">Material and care: </p>
              <p>cotton</p>
              <p>washing machine</p>
            </div>
            <div className="flex flex-col items-center pdAvgRating md:hidden">
              <p className="avgRating">Average Rating</p>
              <p className="pdrating">4.7</p>
              <div className="">
                <ReactStars
                  edit={false}
                  count={5}
                  value={4.5}
                  size={20}
                  activeColor="#FFA534"
                  half={true}
                />
              </div>
              <p className="">112 rating</p>
            </div>
          </div>
           
        </section>
              <div className="flex flex-col bg-[#fff]">
                   
                  <section className="homeContainer ">
                      <p className="pl-1 text-center md:text-left blogMainHead ">You May Also Like </p>
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
                      </section></div>
      </Layout>
    </>
  );
};
export default ProductDetail;

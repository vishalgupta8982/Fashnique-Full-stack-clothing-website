import { useState } from "react";
import Layout from "../../Layouts/Layout/Layout";
import "./AddToCart.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiMiniMinus } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import Button from "../Button/Button";
const AddToCart = () => {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemColor, setItemColor] = useState();
  const [itemSize, setItemSize] = useState();
  return (
    <>
       
        <div className="flex flex-col AddToCartPage md:flex-row w-[screen">
          <section className="w-[100%] md:w-2/3 cartContainer">
            <p className="cartHead">Cart</p>
            <div className="cartItemContainer">
              <div className="cartProductImgContainer">
                <img
                  className="cartProductImg"
                  src="https://m.media-amazon.com/images/I/51w8SzG8V0L._SL1500_.jpg"
                  alt=""
                />
              </div>
              <div className=" cartProductDetail">
                <div className="flex cartItemNamePrice">
                  <p className="cartItemName">Relaxed fit t-shirt</p>
                  <p className=" cartItemPrice">
                    <FaIndianRupeeSign /> 1000
                  </p>
                </div>
                <p className="showStock">
                   In Stock 
                </p>
                <div className="flex-col colorQuantityCart md:flex-row">
                  <div className="flex text-left">
                    <select
                      className="cartItemDropDown"
                      value={itemColor}
                      onChange={(e) => setItemColor(e.target.value)}
                    >
                      <option value="option1">Red</option>
                      <option value="option2">Green</option>
                    </select>
                    <select
                      className="cartItemDropDown"
                      value={itemSize}
                      onChange={(e) => setItemSize(e.target.value)}
                    >
                      <option value="option1">xl</option>
                      <option value="option2">xxl</option>
                    </select>
                    <div className="cartItemQuantity">
                      <span
                        onClick={() =>
                          setItemQuantity((prevQuantity) =>
                            Math.max(1, prevQuantity - 1)
                          )
                        }
                      >
                        <HiMiniMinus className="redIcon" />
                      </span>
                      <span className="cartItemQuantityValue">
                        {itemQuantity}
                      </span>{" "}
                      <span onClick={() => setItemQuantity(itemQuantity + 1)}>
                        <IoAdd className="greenIcon" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center mt-2 md:ml-auto md:mt-0">
                    <div className="save">
                      <IoMdHeart className="mr-1 greenIcon" />
                      Save{" "}
                    </div>
                    <div className="delete">
                      <MdDelete className="mr-1 redIcon" />
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-[100%] mt-4 md:mt-0 md:w-1/3 billContainer">
            <div className="cartBillContainer md:ml-2">
              <p className="cartDelivery">Delivery Free</p>
              <p className="cartDeliveryDate">Delivery Date: June 22, 2024</p>
              <div className=" cartCoupan"> 
                <input className="cartPromoCode" type="text" placeholder="PROMOCODE" />
                <Button title={"Apply"} /></div>
               <div className=" cartPriceContainer">
                <div className="totalContainer"> 
                <p className="subTotal">Subtotal</p>
                <p className=" subTotal">Rs. 1000</p>
                </div>
                <div className="totalContainer"> 
                <p className="smallHeadPrice">Discount</p>
                <p className="smallHeadPrice">Rs. 1000</p>
                </div>
                <div className="totalContainer"> 
                <p className="smallHeadPrice">Delivery</p>
                <p className="smallHeadPrice">Rs. 1000</p>
                </div>
                <div className="totalContainer"> 
                <p className="smallHeadPrice">Tax</p>
                <p className="smallHeadPrice">Rs. 1000</p>
                </div>
               </div>
              <div className="totalContainer">
                <p className="subTotal">Total</p>
                <p className=" subTotal">Rs. 1000</p>
              </div>
              <div className="proceedToCheckOut"> 
              <Button widthButton={"100%"} title={"Proceed to checkout"} />
              <p className="continueShop">Continue Shopping</p>
              </div>
               
            </div>
          </section>
        </div>
       
    </>
  );
};
export default AddToCart;

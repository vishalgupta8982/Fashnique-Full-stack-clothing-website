import React, { useState, useEffect } from "react";
import Layout from "./../../Layouts/Layout/Layout";
import "./Store.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { RiArrowDropRightLine } from "react-icons/ri";
import { PiSortAscendingDuotone } from "react-icons/pi";
import { IoFilterSharp } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { basisSortProduct } from "../../assets/ImportantData/SortBasis"
import {
  colorForFilter,
  ratingsFilter,
  Discount,
} from "../../assets/ImportantData/filterCategory";
import { CgChevronDown } from "react-icons/cg";
import { CgChevronUp } from "react-icons/cg";
import { IoIosStar } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
const Store = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // this is used for store differecnt value
  const [showFilter, setShowFilter] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(true);
  const [isDiscountDropdownOpen, setIsDiscountDropdownOpen] = useState(true);
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedRating, setCheckedRating] = useState([]);
  const [checkedDiscount, setCheckedDiscount] = useState([]);
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [sortBasis, setSortBasis] = useState("All");
  const [showSort, setShowSort] = useState(false);
  //this is handle when user refresh page then filter are still available
  useEffect(() => {
    const colors = queryParams.getAll("color");
    const ratings = queryParams.getAll("rating");
    const discounts = queryParams.getAll("discount");
    setFromPrice(queryParams.get("fromPrice"));
    setToPrice(queryParams.get("toPrice"));
    setCheckedColors(colors);
    setCheckedRating(ratings);
    setCheckedDiscount(discounts);
  }, [location.search]);
  //this function is used for handle all checkbox in filter
  const handleCheckboxChange = (type, value) => {
    switch (type) {
      case "color":
        setCheckedColors((prevCheckedColors) => {
          const newCheckedColors = prevCheckedColors.includes(value)
            ? prevCheckedColors.filter((id) => id !== value)
            : [...prevCheckedColors, value];
          updateURL({ colors: newCheckedColors });
          return newCheckedColors;
        });
        break;
      case "rating":
        setCheckedRating((prevCheckedRating) => {
          const newCheckedRating = prevCheckedRating.includes(value)
            ? prevCheckedRating.filter((rating) => rating !== value)
            : [...prevCheckedRating, value];
          updateURL({ ratings: newCheckedRating });
          return newCheckedRating;
        });
        break;
      case "discount":
        setCheckedDiscount((prevCheckedDiscount) => {
          const newCheckedDiscount = prevCheckedDiscount.includes(value)
            ? prevCheckedDiscount.filter((discount) => discount !== value)
            : [...prevCheckedDiscount, value];
          updateURL({ discounts: newCheckedDiscount });
          return newCheckedDiscount;
        });
        break;
      default:
        break;
    }
  };
  //this function is used for update url on this basis of filter
  const updateURL = ({
    colors = checkedColors,
    ratings = checkedRating,
    discounts = checkedDiscount,
    fromPrice: newFromPrice = fromPrice,
    toPrice: newToPrice = toPrice,
  }) => {
    const queryParams = new URLSearchParams();
    colors.forEach((color) => queryParams.append("color", color));
    ratings.forEach((rating) => queryParams.append("rating", rating));
    discounts.forEach((discount) => queryParams.append("discount", discount));
    if (newFromPrice) {
      queryParams.append("fromPrice", newFromPrice);
    }
    if (newToPrice) {
      queryParams.append("toPrice", newToPrice);
    }

    navigate({ search: queryParams.toString() });
  };
  //this function is for handleFromPriceChange
  const handleFromPriceChange = (e) => {
    const newValue = e.target.value;
    setFromPrice(newValue);
    updateURL({ fromPrice: newValue });
  };
  //this function is for handleToPriceChange
  const handleToPriceChange = (e) => {
    const newValue = e.target.value;
    setToPrice(newValue);
    updateURL({ toPrice: newValue });
  };
//this fuction is used for choose sortbasis
const handleClickOpen=(value)=>{
    setSortBasis(value);
    setShowSort(!showSort)
}
  return (
    <>
      <Layout>
        <div
          className={`flex w-[screen]  ${
            isColorDropdownOpen ? `min-h-[210vh]` : `min-h-[77vh]`
          } p-2 store`}
        >
          <section className=" filterSection">
            <div className={` flex h-[100vh]  pb-11 overflow-x-hidden  absolute    top-0   md:h-fit transition-all ease-out duration-500 filterContainer   ${showFilter ? `left-[0px]` : ` opacity-1`
              }   left-[-400px]    
                    md:static md:left-0`}>
              <div
                className="relative min-w-[100px]   h-[100vh]"
              >
                <div className="flex items-center justify-between">
                  <p className="filterHead">Filter By</p>
                  <span
                    className="p-2 md:hidden"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
                <div className="basisOfFilter">
                  <p className="filtersHead">Price</p>
                  <div className="priceContainer">
                    <div className="priceBox">
                      <FaIndianRupeeSign size={14} />
                      <input
                        className="priceInput"
                        type="text"
                        placeholder="From"
                        value={fromPrice}
                        onChange={handleFromPriceChange}
                      />
                    </div>
                    <div className="priceBox">
                      <FaIndianRupeeSign size={14} />
                      <input
                        className="priceInput"
                        type="text"
                        placeholder="To"
                        value={toPrice}
                        onChange={handleToPriceChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="basisOfFilter">
                  <div className="dropDownFilter">
                    <p className="filtersHead">Color</p>
                    {isColorDropdownOpen ? (<CgChevronUp className="downArrow"
                      onClick={() =>
                        setIsColorDropdownOpen(!isColorDropdownOpen)
                      } />) : (<CgChevronDown className="downArrow"
                      onClick={() =>
                        setIsColorDropdownOpen(!isColorDropdownOpen)
                      } />)}
                  </div>
                  {isColorDropdownOpen && (
                     
                    <div  >
                      {colorForFilter.map((item) => (
                        <div
                          // key={item.id}
                          className="flex items-center leading-10"
                        >
                          <input
                            type="checkbox"
                            id={`colorCheckbox_${item.id}`}
                            checked={checkedColors.includes(item.color)}
                            onChange={() =>
                              handleCheckboxChange("color", item.color)
                            }
                            className="checkBoxFilter"
                          />
                          <div
                            style={{ backgroundColor: item.code }}
                            className="colorWithName"
                          >
                            {" "}
                          </div>
                          <p className="cursor-pointer filterItem">
                            {item.color}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="basisOfFilter">
                  <div className="dropDownFilter">
                    <p className="filtersHead">Customer Ratings</p>
                    {isRatingDropdownOpen ? (<CgChevronUp className="downArrow"
                      onClick={() =>
                        setIsRatingDropdownOpen(!isRatingDropdownOpen)
                      } />) : (<CgChevronDown className="downArrow"
                        onClick={() =>
                          setIsRatingDropdownOpen(!isRatingDropdownOpen)
                        } />)}
                  </div>
                  {isRatingDropdownOpen && (
                      <div    >  
                      {ratingsFilter.map((item) => (
                        <div
                          // key={item.id}
                          className="flex items-center leading-10"
                        >
                          <input
                            type="checkbox"
                            id={`colorCheckbox_${item.id}`}
                            checked={checkedRating.includes(item.rating)}
                            onChange={() =>
                              handleCheckboxChange("rating", item.rating)
                            }
                            className="checkBoxFilter"
                          />
                          <p className="flex items-center cursor-pointer filterItem">
                            {item.rating}
                            <IoIosStar color="#E8960F" />
                            &nbsp; & above
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="basisOfFilter ">
                  <div className="dropDownFilter ">
                    <p className="filtersHead">Discount</p>
                    {isDiscountDropdownOpen ? (<CgChevronUp className="downArrow"
                      onClick={() =>
                        setIsDiscountDropdownOpen(!isDiscountDropdownOpen)
                      } />) : (<CgChevronDown className="downArrow"
                        onClick={() =>
                          setIsDiscountDropdownOpen(!isDiscountDropdownOpen)
                        } />)}
                  </div>
                  {isDiscountDropdownOpen && (
                    <div  > 
                      {Discount.map((item) => (
                        <div
                          // key={item.id}
                          className="flex items-center leading-10 "
                        >
                          <input
                            type="checkbox"
                            id={`colorCheckbox_${item.id}`}
                            checked={checkedDiscount.includes(item.discount)}
                            onChange={() =>
                              handleCheckboxChange("discount", item.discount)
                            }
                            className="checkBoxFilter"
                          />
                          <p className="flex items-center cursor-pointer filterItem">
                            {item.discount}% or more
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="productSectionStore">
            <div className="flex md:hidden filterSortHeader">
              <div
                onClick={() => setShowFilter(!showFilter)}
                className="filterHeader"
              >
                <IoFilterSharp />
                <p className="text-center storeFilter">Filters</p>
              </div>

              <div
                onClick={() => setShowSort(!showSort)}
                className=" sortHeader"
              >
                <PiSortAscendingDuotone />
                <p className="storeSort">Sort</p>{" "}
              </div> {showSort &&
              <div  className="sortForMobile"  >
               {basisSortProduct.map((item) => (
                  <div
                    className={`sortSelectForMobile ${sortBasis === item.name ? "selectedOption" : ""}`}
                    onClick={() => handleClickOpen(item.name)}
                  >
                    <p className="sortSelectForMobileText">{item.name}</p>
                </div>
              ))} </div>
}
            </div>
            <div className="hidden md:flex sortForMdScreen ">
              <div className="flex storeSortForMd">
                <p className="text-center storeSortForMd">Sort By:</p>
                <select
                  value={sortBasis}
                  onChange={(e) => setSortBasis(e.target.value)}
                  className="sortDropDown "
                >
                  <option value="">Featured</option>
                  <option value="Best Selling">Best selling</option>
                  <option value="Date, old to new">Date, old to new</option>
                  <option value="Date, new to old">Date, new to old</option>
                  <option value="Price low to high">Price low to high</option>
                  <option value="Price high to low">Price high to low</option>
                  <option value="Alphabetically, A to Z">
                    Alphabetically, A to Z
                  </option>
                  <option value="Alphabetically, Z to A">
                    Alphabetically, Z to A
                  </option>
                </select>
              </div>
              <p className="storeSortForMd">Showing result out of 18 from 10</p>
            </div>
            <div className="grid justify-between grid-cols-2 gap-0 md:grid-cols-4 productSection">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
            <div className="nextPage">
              <p className="pageNumber">1</p>
              <p className="pageNumber">2</p>
              <p className="pageNumber">3</p>
              <p className="pageNumber">4</p>
              <RiArrowDropRightLine className="pageNumber" />
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Store;
 
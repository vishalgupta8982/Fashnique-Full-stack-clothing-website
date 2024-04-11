import React, { useState, useEffect } from 'react'
import './Store.css'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { PiSortAscendingDuotone } from 'react-icons/pi'
import { IoFilterSharp } from 'react-icons/io5'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { basisSortProduct } from '../../assets/ImportantData/SortBasis'
import { RiArrowDropLeftLine } from 'react-icons/ri'
import { ratingsFilter, Discount } from '../../assets/ImportantData/filterCategory'
import debounce from 'lodash.debounce'
import { CgChevronDown } from 'react-icons/cg'
import { CgChevronUp } from 'react-icons/cg'
import { IoIosStar } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { getColor } from '../../services/Color/ColorAction'
import { getProduct } from '../../services/Products/ProductsActions'
import ClipLoader from 'react-spinners/ClipLoader'
const Store = () => {
  const dispatch = useDispatch()
  const color = useSelector((state) => state.color.Color)
  const product = useSelector((state) => state.product)
  const { Product, loading } = product
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  // this is used for store differecnt value
  const [showFilter, setShowFilter] = useState(false)
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false)
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(true)
  const [isDiscountDropdownOpen, setIsDiscountDropdownOpen] = useState(true)
  const [checkedColors, setCheckedColors] = useState([])
  const [checkedRating, setCheckedRating] = useState()
  const [checkedDiscount, setCheckedDiscount] = useState()
  const [fromPrice, setFromPrice] = useState('')
  const [toPrice, setToPrice] = useState('')
  const [sortBasis, setSortBasis] = useState('')
  const [showSort, setShowSort] = useState(false)
  const [page, setPage] = useState(1)
  //this is handle when user refresh page then filter are still available
  useEffect(() => {
    const colors = queryParams.getAll('color')
    setFromPrice(queryParams.get('price[gte]'))
    setToPrice(queryParams.get('price[lte]'))
    setSortBasis(queryParams.get('sort'))
    setPage(parseInt(queryParams.get('page')) || 1)
    setCheckedColors(colors)
    setCheckedRating(queryParams.get('totalRatings[gte]'))
    setCheckedDiscount(queryParams.get('discount[gte]'))
  }, [location.search])
  //this function is used for handle all checkbox in filter
  const handleCheckboxChange = (type, value) => {
    switch (type) {
      case 'color':
        setCheckedColors((prevCheckedColors) => {
          const newCheckedColors = prevCheckedColors.includes(value)
            ? prevCheckedColors.filter((id) => id !== value)
            : [...prevCheckedColors, value]
          updateURL({ colors: newCheckedColors })
          return newCheckedColors
        })
        break
      case 'sort':
        setSortBasis(value)
        updateURL({ sorts: value })
        break
      case 'page':
        setPage(value)
        updateURL({ pages: value })
        break
      default:
        break
    }
  }
  //this function is used for update url on this basis of filter
  const updateURL = ({
    colors = checkedColors,
    sorts = sortBasis,
    pages = page,
    ratings: newRatings = checkedRating,
    discounts: newDiscount = checkedDiscount,
    fromPrice: newFromPrice = fromPrice,
    toPrice: newToPrice = toPrice,
  }) => {
    const queryParams = new URLSearchParams()
    colors.forEach((color) => queryParams.append('color', color))

    if (newRatings) {
      queryParams.append('totalRatings[gte]', newRatings)
    }
    if (newDiscount) {
      queryParams.append('discount[gte]', newDiscount)
    }
    queryParams.append('sort', sorts)
    queryParams.append('page', pages)
    if (newFromPrice) {
      queryParams.append('price[gte]', newFromPrice)
    }
    if (newToPrice) {
      queryParams.append('price[lte]', newToPrice)
    }

    navigate({ search: queryParams.toString() })
  }

  const debouncedDispatch = debounce((value) => {
    dispatch(getProduct(value))
    dispatch(getColor())
  }, 200)
  useEffect(() => {
    debouncedDispatch(queryParams.toString())
    return () => debouncedDispatch.cancel()
  }, [queryParams.toString()])

  //this function is for handleFromPriceChange
  const handleFromPriceChange = (e) => {
    const newValue = e.target.value
    setFromPrice(newValue)
    updateURL({ fromPrice: newValue })
  }
  //this function is for handleToPriceChange
  const handleToPriceChange = (e) => {
    const newValue = e.target.value
    setToPrice(newValue)
    updateURL({ toPrice: newValue })
  }
  const handleRatingChange = (e) => {
    if (e == checkedRating) {
      setCheckedRating(null)
      updateURL({ ratings: null })
    } else {
      setCheckedRating(e)
      updateURL({ ratings: e })
    }
  }
  const handleDiscountChange = (e) => {
    if (e == checkedDiscount) {
      setCheckedDiscount(null)
      updateURL({ discounts: null })
    } else {
      setCheckedDiscount(e)
      updateURL({ discounts: e })
    }
  }
  console.log(queryParams.toString())
  return (
    <>
      <div
        className={`flex w-[screen]  ${
          isColorDropdownOpen ? `min-h-[100vh]` : `min-h-[77vh]`
        } p-2 store`}
      >
        <section className=' filterSection'>
          <div
            className={` flex h-[100vh]  pb-11 overflow-x-hidden  absolute    top-0   md:h-fit transition-all ease-out duration-500 filterContainer   ${
              showFilter ? `left-[0px]` : ` opacity-1`
            }   left-[-400px]    
                    md:static md:left-0`}
          >
            <div className='relative min-w-[100px]   h-[100vh]'>
              <div className='flex items-center justify-between'>
                <p className='filterHead'>Filter By</p>
                <span className='p-2 md:hidden' onClick={() => setShowFilter(!showFilter)}>
                  <AiOutlineClose />
                </span>
              </div>
              <div className='basisOfFilter'>
                <p className='filtersHead'>Price</p>
                <div className='priceContainer'>
                  <div className='priceBox'>
                    <FaIndianRupeeSign size={14} />
                    <input
                      className='priceInput'
                      type='text'
                      placeholder='From'
                      value={fromPrice}
                      onChange={handleFromPriceChange}
                    />
                  </div>
                  <div className='priceBox'>
                    <FaIndianRupeeSign size={14} />
                    <input
                      className='priceInput'
                      type='text'
                      placeholder='To'
                      value={toPrice}
                      onChange={handleToPriceChange}
                    />
                  </div>
                </div>
              </div>
              <div className='basisOfFilter'>
                <div className='dropDownFilter'>
                  <p className='filtersHead'>Color</p>
                  {isColorDropdownOpen ? (
                    <CgChevronUp
                      className='downArrow'
                      onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                    />
                  ) : (
                    <CgChevronDown
                      className='downArrow'
                      onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                    />
                  )}
                </div>
                {isColorDropdownOpen && (
                  <div>
                    {color &&
                      color.map((item) => (
                        <div
                          // key={item.id}
                          className='flex items-center leading-10'
                        >
                          <input
                            type='checkbox'
                            id={`colorCheckbox_${item._id}`}
                            checked={checkedColors.includes(item.title)}
                            onChange={() => handleCheckboxChange('color', item.title)}
                            className='checkBoxFilter'
                          />
                          <div
                            style={{
                              backgroundColor: item.title.split('-')[1],
                            }}
                            className='colorWithName'
                          >
                            {' '}
                          </div>
                          <p className='cursor-pointer filterItem'>{item.title.split('-')[0]}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className='basisOfFilter'>
                <div className='dropDownFilter'>
                  <p className='filtersHead'>Customer Ratings</p>
                  {isRatingDropdownOpen ? (
                    <CgChevronUp
                      className='downArrow'
                      onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                    />
                  ) : (
                    <CgChevronDown
                      className='downArrow'
                      onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                    />
                  )}
                </div>
                {isRatingDropdownOpen && (
                  <div>
                    {ratingsFilter.map((item) => (
                      <div
                        // key={item.id}
                        className='flex items-center leading-10'
                      >
                        <input
                          type='checkbox'
                          id={`colorCheckbox_${item.id}`}
                          checked={checkedRating == item.rating}
                          onChange={() => handleRatingChange(item.rating)}
                          className='checkBoxFilter'
                        />
                        <p className='flex items-center cursor-pointer filterItem'>
                          {item.rating}
                          <IoIosStar color='#E8960F' />
                          &nbsp; & above
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='basisOfFilter '>
                <div className='dropDownFilter '>
                  <p className='filtersHead'>Discount</p>
                  {isDiscountDropdownOpen ? (
                    <CgChevronUp
                      className='downArrow'
                      onClick={() => setIsDiscountDropdownOpen(!isDiscountDropdownOpen)}
                    />
                  ) : (
                    <CgChevronDown
                      className='downArrow'
                      onClick={() => setIsDiscountDropdownOpen(!isDiscountDropdownOpen)}
                    />
                  )}
                </div>
                {isDiscountDropdownOpen && (
                  <div>
                    {Discount.map((item) => (
                      <div
                        // key={item.id}
                        className='flex items-center leading-10 '
                      >
                        <input
                          type='checkbox'
                          id={`colorCheckbox_${item.id}`}
                          checked={checkedDiscount == item.discount}
                          onChange={() => handleDiscountChange(item.discount)}
                          className='checkBoxFilter'
                        />
                        <p className='flex items-center cursor-pointer filterItem'>
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
        <section className='productSectionStore w-[100%]  '>
          <div className='flex md:hidden filterSortHeader'>
            <div onClick={() => setShowFilter(!showFilter)} className='filterHeader'>
              <IoFilterSharp />
              <p className='text-center storeFilter'>Filters</p>
            </div>
            <div onClick={() => setShowSort(!showSort)} className=' sortHeader'>
              <PiSortAscendingDuotone />
              <p className='storeSort'>Sort</p>{' '}
            </div>{' '}
            {showSort && (
              <div className='sortForMobile'>
                {basisSortProduct.map((item) => (
                  <div
                    className={`sortSelectForMobile ${
                      sortBasis === item.value ? 'selectedOption' : ''
                    }`}
                    onClick={() => handleCheckboxChange('sort', item.value)}
                  >
                    <p className='sortSelectForMobileText'>{item.label}</p>
                  </div>
                ))}{' '}
              </div>
            )}
          </div>
          <div className='hidden md:flex sortForMdScreen '>
            <div className='flex storeSortForMd'>
              <p className='text-center storeSortForMd'>Sort By:</p>
              <select
                value={sortBasis}
                className='sortDropDown'
                onChange={(e) => handleCheckboxChange('sort', e.target.value)}
              >
                {basisSortProduct.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <p className='storeSortForMd'>
              Showing {Product?.data?.product?.length != 0 ? (page - 1) * 8 + 1 : 0}-
              {(Product?.data?.product.length != 0 ? (page - 1) * 8 : 0) +
                Product?.data?.product.length}{' '}
              of{' '}
              {(Product?.data?.totalPages - 1) * 8 + Product?.data?.product.length > 8
                ? (Product?.data?.totalPages - 1) * 8 + Product?.data?.product.length
                : Product?.data?.product.length}{' '}
              results{' '}
            </p>
          </div>
          {loading ? (
            <div className='loader'>
              <ClipLoader
                color={'#52ab98'}
                loading={loading}
                size={25}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ) : (
            <div className='min-h-[100vh]'>
              {Product?.data?.product?.length > 0 ? (
                <div className='grid grid-cols-2 gap-0 min-h-[95vh] justify-self-center items-start md:grid-cols-4 '>
                  {' '}
                  {Product.data.product.map((item) => (
                    <ProductCard data={item} />
                  ))}
                </div>
              ) : (
                <div className='notProductImgCont min-h-[95vh]'>
                  <img
                    className='notProductImg'
                    src='https://myntraweb.blob.core.windows.net/selfserveui/assets/images/cards@3x.png'
                    alt='firstOrder'
                  />
                  <p className='noProductText'>No products available with the selected filters.</p>
                </div>
              )}

              <div className='items-end nextPage'>
                {page > 1 ? (
                  <span onClick={() => handleCheckboxChange('page', page - 1)}>
                    <RiArrowDropLeftLine className='pageNumber' />
                  </span>
                ) : (
                  <RiArrowDropLeftLine className='pageNumberEnd' />
                )}

                {[...Array(Math.min(3, Product.data?.totalPages || 0))].map((_, index) => {
                  const pageNumber = page < 2 ? index + 1 : page - 1 + index
                  return (
                    <p
                      key={index}
                      onClick={() => handleCheckboxChange('page', pageNumber)}
                      className={`pageNumber ${pageNumber === page ? 'activePage' : ''}`}
                    >
                      {pageNumber}
                    </p>
                  )
                })}

                {page < Product.data?.totalPages ? (
                  <span onClick={() => handleCheckboxChange('page', page + 1)}>
                    <RiArrowDropRightLine className='pageNumber' />
                  </span>
                ) : (
                  <RiArrowDropRightLine className='pageNumberEnd' />
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Store

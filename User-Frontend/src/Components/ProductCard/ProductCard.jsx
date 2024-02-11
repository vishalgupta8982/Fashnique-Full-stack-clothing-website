 import './ProductCard.css'
import { FaRegHeart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { FaIndianRupeeSign } from "react-icons/fa6";
 import {useNavigate} from "react-router-dom"
const ProductCard= () => {
    const navigate=useNavigate()
    return (
        <>
            <div className='productCard'>
                <div onClick={() => navigate('/productdetail')} className="ProductCards ">
                    <div className=' productCardImgContainer'> 
                    <div className='icon'> 
                            <FaRegHeart   size={20} /></div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXt3luaPKC3aQczQIfaBORDOmrko2N54ckXjbA6IIC9Xo0Q3WhSGqmDkAbbfvqH7WRp3I&usqp=CAU" alt="" className=" productCardImg" />
                    </div>
                    <div className=" productCardContent">
                        <p className="productCompany">Brand</p>
                        <p className="productHead">Lorem ipsum dolor sit amet.</p>
                        <ReactStars
                            edit={false}
                            count={5}
                            value={2}
                            size={20}
                            activeColor="#FFA534"
                        />
                        <p className=" productCardPrice"><FaIndianRupeeSign size={12} /><span>1000</span></p>
                    </div>
                    
                </div>

            </div>
        </>
    )
}
export default ProductCard;
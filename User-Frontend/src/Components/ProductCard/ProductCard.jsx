 import './ProductCard.css'
import ReactStars from "react-rating-stars-component";
import { FaIndianRupeeSign } from "react-icons/fa6";
 import {useNavigate} from "react-router-dom"
const ProductCard= ({data}) => {
    const navigate=useNavigate()
    return (
        <>
            <div className='productCard'>
                <div onClick={() => navigate(`/productdetail/${data.slug}=${data._id}`, { state: { id: data._id } })}
 className="ProductCards ">
                    <div className=' productCardImgContainer'> 
                        <img src={data.images[0]?.url || "https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg"} alt="" className=" productCardImg" />
                    </div>
                    <div className=" productCardContent">
                        <p className="productCompany">{data.brand.slice(0, 20)}</p>
                        <p className="productHead">{data.title.slice(0, 20)}</p>
                        <ReactStars
                            edit={false}
                            count={5}
                            value={data.totalRatings}
                            size={20}
                            activeColor="#FFA534"
                        />
                        <p className=" productCardPrice"><FaIndianRupeeSign size={12} /><span>{data.price}</span></p>
                    </div>
                    
                </div>

            </div>
        </>
    )
}
export default ProductCard;
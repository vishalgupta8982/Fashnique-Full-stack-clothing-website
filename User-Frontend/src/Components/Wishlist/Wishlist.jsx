import Layout from '../../Layouts/Layout/Layout'
import './Wishlist.css'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { useEffect } from 'react'
import {useDispatch ,useSelector} from "react-redux"
import { getWishlist } from '../../services/Wishlist/WishlistAction'
import ClipLoader from 'react-spinners/ClipLoader'
 const Wishlist=()=>{
        const dispatch=useDispatch()
         useEffect(() => {
                 dispatch(getWishlist());
         }, []);

        const wishlist=useSelector((state)=>state.wishlist)
        const {loading,Wishlist,isSuccess}=wishlist
    return(
        <>
                 <div className="grid justify-between grid-cols-2 gap-0 md:grid-cols-5 wishListContainer min-h-[50vh]">
                            {loading && (
                                    <div className="loader">
                                            <ClipLoader
                                                    color={'#52ab98'}
                                                    loading={loading}
                                                    size={25}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                            />
                                    </div>
                            )}
                        {Wishlist?.wishlist && Wishlist.wishlist.map((item)=>(
                                <ProductCard data={item} /> 
                        
                        ))}
                    </div>
            </>
    )
 }
 export default Wishlist
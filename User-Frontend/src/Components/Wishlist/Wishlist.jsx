import Layout from '../../Layouts/Layout/Layout'
import './Wishlist.css'
import ProductCard from '../../Components/ProductCard/ProductCard'
 const Wishlist=()=>{
    return(
        <>
        <Layout>
                <div className="grid justify-between grid-cols-2 gap-0 md:grid-cols-5 wishListContainer">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
                    <ProductCard /></div>
            </Layout></>
    )
 }
 export default Wishlist
import './Blogs.css'
import Layout from '../../Layouts/Layout/Layout'
import BlogCard from '../../Components/BlogCard.js/BlogCard'
const Blogs=()=>{
    return (
<>
 <Layout>
                <div className="grid justify-between grid-cols-2 gap-0 md:grid-cols-5 ">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>

 </Layout>
</>
    )
}
export default Blogs
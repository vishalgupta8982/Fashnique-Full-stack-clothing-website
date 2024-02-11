import Button from '../Button/Button'
import './BlogCard.css'
import {useNavigate} from 'react-router-dom'
const BlogCard = () => {
    const navigate=useNavigate()
    return (
        <>
            <div onClick={()=>navigate('/blogDetail')} className=' blogCard'>
            <div className="cards ">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXt3luaPKC3aQczQIfaBORDOmrko2N54ckXjbA6IIC9Xo0Q3WhSGqmDkAbbfvqH7WRp3I&usqp=CAU" alt="" className=" blogCardImg" /> 
                    <div className=" blogCardContent">
                        <p className="blogDate">1 Dec, 2023</p>
                        <p className="blogHead">Lorem ipsum dolor sit amet.</p>
                        <p className="blogContent">Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    <Button widthButton={"100px"} navigation={'/blogdetail'} title="Read More" />
                </div> 
                 
        </div>
        </>
    )
}
export default BlogCard
 
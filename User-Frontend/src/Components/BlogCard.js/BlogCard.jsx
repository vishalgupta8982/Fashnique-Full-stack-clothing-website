import Button from '../Button/Button'
import './BlogCard.css'
import {useNavigate} from 'react-router-dom'
import moment from 'moment';
const BlogCard = ({data}) => {
    const navigate=useNavigate()
    return (
        <>
            <div onClick={()=>navigate(`/blogDetail/${data._id}`)} className=' blogCard'>
            <div className="cards ">
                    <img src={data.images[0]?.url || "https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg"} alt="" className=" blogCardImg" /> 
                    <div className=" blogCardContent">
                        <p className="blogDate">{moment(data.createdAt).format('DD MMM YYYY')}</p>
                        <p className="blogHead">{data.title.slice(0,15)}</p>
                        <p className="blogContent">{data.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 15).join(' ')}{(data.description.replace(/<[^>]+>/g, '').split(' ').length > 4 ? '...' : '')}</p>


                    </div>
                    <Button widthButton={"100px"}   title="Read More" />
                </div> 
                 
                  
        </div>
        </>
    )
}
export default BlogCard
 
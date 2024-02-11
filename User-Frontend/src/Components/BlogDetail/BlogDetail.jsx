import Layout from "../../Layouts/Layout/Layout";
import "./BlogDetail.css";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
const BlogDetail = () => {
  return (
    <>
      <Layout>
        <div className="blogDetailPage">
          <div className="blogdetailContainer w-[100vw] md:w-[70vw]">
            <p className="blogName">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
              iure.
            </p>
            <div className=" blogDetailNameAndDate">
              <p className=" blogDetailDate">
                <CiCalendarDate />
                17th July, 2023{" "}
              </p>
              <span className="borderBetween">|</span>
              <p className=" blogDetailName">
                <CiUser />
                Vishal Gupta
              </p>{" "}
            </div>
            <img
              className="blogDetailImg"
              src="https://www.shoppre.com/img/shoppre/Customs-0-VAT%20blog-new.jpg"
              alt=""
            />
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim expedita nihil, necessitatibus ipsa, facilis commodi illo quod quas eius, aliquam nesciunt! Omnis velit quibusdam eum optio minima doloribus iure quam hic repudiandae libero eligendi a, illum quos tempore? Reiciendis, maxime iure ad nulla ut beatae numquam eius cum molestiae repellat, corporis necessitatibus tenetur culpa nesciunt consequatur consectetur error eos excepturi velit. Porro totam accusantium ipsa sint inventore blanditiis. Beatae iusto commodi nostrum ut eligendi veniam, explicabo iure est quo modi perferendis quidem consectetur incidunt consequatur repudiandae fuga quibusdam porro fugit aperiam, officiis voluptatibus voluptates magnam cupiditate qui! Ducimus, ipsam provident.</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default BlogDetail;

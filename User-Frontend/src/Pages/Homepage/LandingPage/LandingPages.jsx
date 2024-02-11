import { homepageTagline } from "../../../assets/ImportantData/HomepageTagline";
import Button from "../../../Components/Button/Button";
import './LandingPage.css'
const LandingPage = () => {
    const tagline =
        homepageTagline[Math.floor(Math.random() * homepageTagline.length)];
    return (
        <>
            <div className="flex min-h-[43vh] w-[screen]">
                <div  className="flex flex-col-reverse w-screen md:flex-row homepage">
                    <div data-aos="fade-right" className="w-[screen] min-h-[36vh] mb-10 md:h-[73vh] md:w-1/2 homeLeft">
                        <div className="p-10 text-center md:text-left">
                            <p className="mb-3 home_text2">
                                <p className="home_text1">
                                    {tagline.smallText}
                                </p>
                                <span className="off">{tagline.largeText1}</span>
                                {tagline.largeText2} <br /> {tagline.largeText3}
                            </p>
                            <Button title={"Shop Now"} />
                        </div>
                    </div>
                    <div   className="w-[screen] min-h-[36vh] md:h-[73vh] md:w-1/2 homeRight">
                        <img className="home_img" src={tagline.imgUrl} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage
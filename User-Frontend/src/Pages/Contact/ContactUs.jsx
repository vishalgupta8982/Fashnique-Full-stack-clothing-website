import Layout from "../../Layouts/Layout/Layout"
import './Contact.css'
import contactImg from '../../assets/images/contact.png'
import Button from "../../Components/Button/Button"
const ContactUs=()=>{
    return(
        <Layout>
            <div className="contactPage min-h-[73vh]"> 
            <div className="ContactContainer md:flex-row flex-col-reverse md:w-[90vw]">
                <div className="md:w-1/2 contactInputsContainer">
                     <p className="getInTouch">GET IN TOUCH WITH US</p>
                     <p className="feelFree">Feel free to contact us and we will get back to you as soon as it possible</p>
                     <input className="contactInput" type="text" placeholder="Name" />
                     <input className="contactInput" type="text" placeholder="Email" />
                    <textarea className="contactInput" name="message" rows="4" placeholder="message" />
                    <Button title={"Submit"} widthButton={"98%"} />
                </div>
                <div data-aos="zoom-in" data-aos-duration="500" className="md:w-1/2 contactImgContainer">
                    <img className="contactImg md:w-[80%]" src={contactImg} alt="" />
                </div>
                </div></div>
        </Layout>
    )
}
export default ContactUs
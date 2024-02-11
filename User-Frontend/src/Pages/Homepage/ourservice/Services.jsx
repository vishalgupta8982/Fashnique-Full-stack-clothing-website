import { services } from "../../../assets/ImportantData/Services"
import './services.css'
const Services=()=>{
    return(
        <>
            <div className="flex flex-col text-left md:flex-row service ">
                {services.map((item) => (
                    <div className="flex items-center w-screen p-3 px-5 ourService md:w-1/6 ">
                        <span className="mr-2 text-3xl servicesIcon">{item.icon}</span>
                        <div>
                            <p className="services1">{item.services1}</p>
                            <p className="services2">{item.services2}</p>
                        </div>
                    </div>
                ))}
            </div></>
    )
}
export default Services
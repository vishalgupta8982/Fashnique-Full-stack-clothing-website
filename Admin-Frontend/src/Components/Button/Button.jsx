import './Button.css'
import { useNavigate } from "react-router-dom"
const Button=({title,navigation,widthButton})=>{
  const navigate = useNavigate()
    return (
      <button
        className="button"
         style={{width:widthButton}}
        onClick={() => navigate(navigation)}
      >
         {title}
      </button>
    );
}
export default Button
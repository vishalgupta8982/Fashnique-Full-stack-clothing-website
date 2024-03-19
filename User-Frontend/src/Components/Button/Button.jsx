import './Button.css'
import { useNavigate } from 'react-router-dom'
const Button = ({ title, navigation, widthButton, icon }) => {
  const navigate = useNavigate()
  return (
    <button className='button' style={{ width: widthButton }} onClick={() => navigate(navigation)}>
      {icon && <span className='flex items-center'>{icon}&nbsp;</span>}
      {title}
    </button>
  )
}
export default Button

import './Button.css'
import { useNavigate } from 'react-router-dom'
const Button = ({ title, navigation, widthButton, icon }) => {
  const navigate = useNavigate()
  return (
    <button className='button' style={{ width: widthButton }} onClick={() => navigate(navigation)}>
      {icon}&nbsp;{title}
    </button>
  )
}
export default Button

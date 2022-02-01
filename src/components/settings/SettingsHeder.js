import { Link } from 'react-router-dom'
import leftIcon from '../../utils/img/left.svg'
import './SettingsHeader.css'

const SettingsHeader = ({ title, link }) => {
  return (
    <div className='settings__wrapper'>
      <Link to={link || `/user/settings`}><img src={leftIcon} alt="Left arrow" /></Link>
      <h2>{title}</h2>
      <div></div>
    </div>
  )
}

export default SettingsHeader
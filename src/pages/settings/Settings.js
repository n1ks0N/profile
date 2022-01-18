import { Link, useNavigate } from 'react-router-dom'
import avatarIcon from '../../utils/img/avatar.svg'
import profileIcon from '../../utils/img/profile.svg'
import locationIcon from '../../utils/img/location.svg'
import './Settings.css'

const Settings = ({ user, userData }) => {
  let navigate = useNavigate()
  const navigateTo = (location) => {
    navigate(`/user/settings/${location}`)
  }
  return (
    <div className='settings'>
      <div className="main__info">
        <div>
          <img src={avatarIcon} />
        </div>
        <div className='main__info__text'>
          <h3>{userData.name} {userData.surname}</h3>
          <p><img src={locationIcon} />{userData.city}</p>
        </div>
      </div>
      <div>
        <div className='settings__item' onClick={() => navigateTo('profile')}>
          <h4>Личные данные</h4>
          <p>{userData.name} {userData.surname}</p>
          <p>{userData.city}</p>
          <p>{userData.phone}</p>
          <p>{userData.mail}</p>
        </div>
        <div className='settings__item' onClick={() => navigateTo('about')}>
          <h4>О себе</h4>
          <p>{userData.about}</p>
        </div>
        <div className='settings__item' onClick={() => navigateTo('interests')}>
          <h4>Интересы</h4>
          
        </div>
        <div className='settings__item' onClick={() => navigateTo('facts')}>
          <h4>Факты</h4>
          
        </div>
      </div>
    </div>
  )
}

export default Settings
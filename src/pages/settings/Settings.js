import { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import avatarIcon from '../../utils/img/avatar.svg'
import profileIcon from '../../utils/img/profile.svg'
import locationIcon from '../../utils/img/location.svg'
import plusIcon from '../../utils/img/plus.svg'
import cameraIcon from '../../utils/img/camera.svg'
import './Settings.css'

const Settings = ({ user, userData }) => {
  let navigate = useNavigate()
  const navigateTo = (location) => {
    navigate(`/user/settings/${location}`)
  }
  const changeAvatar = () => {
    document.querySelector('#upload').click()
  }
  const fileReader = (e) => {
    console.log(e.target.files[0])
    let reader = new FileReader();
    const file = e.target.files[0]
    reader.readAsDataURL(file);
    reader.onload = () => {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.email}.${file.name.split('.').pop()}`);
      uploadBytes(avatarRef, reader.result).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    };
  }
  useLayoutEffect(() => {
    if (!user) {
      // navigate('/login')
      window.location = '/login'
    }
  }, [user])
  return (
    <div className='settings'>
      {user && <>
      <div className="main__info">
        <div className='avatar-wrap' onClick={changeAvatar}>
          <div className='avatar-wrap__bg'>
            <img src={cameraIcon} />
          </div>
          <img src={avatarIcon} />

          <input type="file" accept='image/*' name="img" id="upload" style={{ display: 'none' }} onChange={fileReader} />
        </div>
        <div className='main__info__text-wrapper'>
          <h3>{userData?.name} {userData?.surname}</h3>
          <p className='main__info__location'><img src={locationIcon} />&nbsp;{userData?.city}</p>
        </div>
      </div>
      <div>
        <div className='settings__item' onClick={() => navigateTo('profile')}>
          <h4>Личные данные</h4>
          <p>{userData?.name} {userData?.surname}</p>
          <p>{userData?.city}</p>
          <p>{userData?.phone}</p>
          <p>{userData?.mail}</p>
        </div>
        <div className='settings__item' onClick={() => navigateTo('about')}>
          <h4>О себе</h4>
          <p>{userData.about}</p>
          {userData?.videos.length > 0 &&
            <p><img />&nbsp;Добавлено {userData?.videos.length} видео</p>
          }
        </div>
        <div className='settings__item' onClick={() => navigateTo('interests')}>
          <h4>Интересы</h4>
          <p>{userData?.interests.map((item) => item.label).join(', ')}</p>
        </div>
        <div className='settings__item settings__item_none-cursor'>
          <h4>Факты</h4>
          {userData?.facts.map((item, i) =>
            <div className='settings__item' onClick={() => navigateTo(`facts/${item.value}`)} key={i}>
              <h6>{item.label}</h6>
              <p>{item.text}</p>
            </div>
          )}
          <Link to="/user/settings/facts"><button type="button" className="btn btn-link btn-add"><img src={plusIcon} />Добавить факт</button></Link>
        </div>
      </div>
      </>
    }
    </div>
  )
}

export default Settings
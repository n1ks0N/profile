import { getAuth, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';
import avatarIcon from '../utils/img/avatar.svg'
import locationIcon from '../utils/img/location.svg'
import './User.css'

const User = ({ user, setUser, userData }) => {
  let navigate = useNavigate()
  const logout = () => {
    signOut(getAuth()).then(() => {
      setUser(false)
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])
  return (
    <div>
      {
        user === 'loading' ?
          <div className='loader'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <>
            <div className="main">
              <div className="main__info">
                <div>
                  <img src={avatarIcon} />
                </div>
                <div className='main__info__text'>
                  <h3>{userData.name} {userData.surname}</h3>
                  <p><img src={locationIcon} />{userData.city}</p>
                </div>
              </div>
              <div className='width-100'>
                <Link to="/user/settings"><button className='btn btn-user'>Редактировать профиль</button></Link>
              </div>
              <div className="main__about">
                <h2>О себе</h2>
                <p>{userData.about}</p>
                <div>

                </div>
              </div>
              <div className="main-interests">
                <h2>Интересы</h2>

              </div>
              <div>
                <h2>Любопытные факты</h2>
                <div className='main-facts__wrapper'>

                </div>
              </div>
            </div>
            <button type='button' className='btn btn-logout width-100' onClick={logout}>Выйти из профиля</button>
          </>
      }
    </div>
  );
}

export default User
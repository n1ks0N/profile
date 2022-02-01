import { useLayoutEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import avatarIcon from '../utils/img/avatar.svg'
import locationIcon from '../utils/img/location.svg'
import './User.css'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"

import SwiperCore, {
  FreeMode, Pagination
} from 'swiper';
import SettingsHeader from '../components/settings/SettingsHeder';
SwiperCore.use([FreeMode, Pagination]);

const User = ({ user, setUser, currentUserData, setCurrentUserData }) => {
  const userId = user ? user.uid.slice(0, 6) : false
  const [userData, setUserData] = useState(false)
  let navigate = useNavigate()
  let location = useLocation()
  const logout = () => {
    signOut(getAuth()).then(() => {
      setUser(false)
      setCurrentUserData(false)
    }).catch((error) => {
      console.log(error)
    }).then(() => navigate('/'))
  }
  useLayoutEffect(() => {
    const paths = location.pathname.split('/')
    const lastPath = paths.pop()
    if (user && userId === lastPath) {
      setUserData(currentUserData)
    } else if (lastPath !== 'user' && !paths.includes('/settings')) {
      let find = false
      getDocs(collection(getFirestore(), "users")).then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id === lastPath) {
            setUserData(doc.data())
            find = true
          }
        });
      }).then(() => {
        if (!find) {
          setUserData(false)
        }
      })
    } else if (user) {
      window.history.pushState({}, '', `/user/${userId}`)
      setUserData(currentUserData)
      console.log('CURRENT USER', currentUserData)
    } else {
      window.location = `/login`
    }
  }, [location, currentUserData])
  return (
    <div>
      {
        user === 'loading' || userData === 'loading' || !userData ?
          <div className='loader'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          :
          <div className='main-wrap'>
            <SettingsHeader title="Мой профиль" link="/" />
            <div className="main">
              <div className="main__info">
                <div>
                  <img src={userData?.avatar || avatarIcon} className='avatar' />
                </div>
                <div className='main__info__text-wrapper'>
                  <h3 className='main__info__name'>{userData.name} {userData.surname}</h3>
                  <p className='main__info__location'><img src={locationIcon} />&nbsp;{userData.city}</p>
                </div>
              </div>
              <div className='width-100'>
                <Link to="/user/settings"><button className='btn btn-user'>Редактировать профиль</button></Link>
              </div>
              <div className="main__about">
                <h2>О себе</h2>
                <p>{userData.about}</p>
                <Swiper slidesPerView={'auto'} spaceBetween={20} freeMode={true} className="mySwiper">
                  {userData?.videos !== undefined && userData?.videos.length > 0 ? userData.videos.map((item, i) =>
                    <SwiperSlide>
                      <iframe key={i} width="160px" height="100px" src={item} title="Video player" frameBorder="0" allow="" allowFullScreen />
                    </SwiperSlide>)
                    :
                    <></>}
                </Swiper>
              </div>
              <div className="main-interests">
                <h2>Интересы</h2>
                <Swiper slidesPerView={'auto'} spaceBetween={20} freeMode={true} className="mySwiper">
                  {userData?.interests !== undefined && userData?.interests.length > 0 ? userData.interests.map((item, i) =>
                    <SwiperSlide>
                      <div className="main-interests__item" key={i}>
                        <p className="main-interests__text">{item.label}</p>
                      </div>
                    </SwiperSlide>)
                    :
                    <SwiperSlide><p>Интересов нет :(</p></SwiperSlide>}
                </Swiper>
              </div>
              <div>
                <h2>Любопытные факты</h2>
                <div className='main-facts__wrapper'>
                  <Swiper slidesPerView={'auto'} spaceBetween={20} freeMode={true} className="mySwiper">
                    {userData?.facts !== undefined && userData?.facts.length > 0 ? userData.facts.map((item, i) =>
                      <SwiperSlide>
                        <div className="main-facts__item" key={i}>
                          <h5 className='main-facts__title'>{item.label}</h5>
                          <p className='main-facts__text'>{item.text}</p>
                          <button type="button" className="btn btn-link main-facts__btn">{item.link}</button>
                        </div>
                      </SwiperSlide>)
                      :
                      <SwiperSlide><p>Фактов нет :(</p></SwiperSlide>}
                  </Swiper>
                </div>
              </div>
            </div>
            <button type='button' className='btn btn-logout width-100' onClick={logout}>Выйти из профиля</button>
          </div>
      }
    </div>
  );
}

export default User
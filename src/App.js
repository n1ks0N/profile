import React, { useEffect, useState } from 'react';
import { Route, Link, Routes, useNavigate } from 'react-router-dom'
import Main from './pages/Main'
import Login from './components/auth/Login';
import Sign from './components/auth/Sign';
import User from './pages/User'
import Profile from './pages/settings/Profile'
import Settings from './pages/settings/Settings';
import profileIcon from './utils/img/profile.svg'
import logoImage from './utils/img/logo.svg'
import avatarImage from './utils/img/avatar.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc, getFirestore } from 'firebase/firestore';
import { fb } from './utils/constants/firebase';
import './App.css';
import './components/auth/Auth.css'
import About from './pages/settings/About';
import Facts from './pages/settings/Facts';
import Interests from './pages/settings/Interests';
import Loader from './components/loader/Loader'

const App = () => {
  // Main data about user for login or logout status
  // If 'loading' then show on all pages loader
  // If false then redirect on Main page
  // If user data then give allow to User page
  const [user, setUser] = useState('loading')

  const [userData, setUserData] = useState('loading')

  const [loginModal, setLoginModal] = useState(false)

  let navigate = useNavigate() // for redirects

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
      } else {
        setUser(false)
        if (document.cookie.includes('account=true')) {
          setLoginModal(true)
        }
      }
    })
  }, [])
  useEffect(() => {
    if (user.email) {
      const unsub = onSnapshot(doc(getFirestore(), "users", user.email), (doc) => {
        setUserData(doc.data())
      });
    }
  }, [user])
  const openAuthModal = () => {
    if (user) {
      navigate('/user')
    } else if (loginModal) {
      navigate('/login')
    } else {
      navigate('/sign')
    }
  }
  return (
    <div className="app">
      <header className="header">
        <div>

        </div>
        <div>
            <Link to="/"><img src={logoImage} /></Link>
        </div>
        <button type='button' className='btn btn-link' onClick={openAuthModal}>
          {user !== 'loading' && userData !== 'loading' ?
            <img src={avatarImage} className='header__avatar' />
            : 
            <img src={profileIcon} />
          }
        </button>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/sign" element={<Sign user={user} setUser={setUser} />} />
        </Routes>
        {user !== 'loading' && userData !== 'loading' ?
          <Routes>
            <Route exact path="/user/settings/profile" element={<Profile user={user} userData={userData} />} />
            <Route exact path="/user/settings/about" element={<About user={user} userData={userData} />} />
            <Route exact path="/user/settings/facts" element={<Facts user={user} userData={userData} />} />
            <Route exact path="/user/settings/interests" element={<Interests user={user} userData={userData} />} />
            <Route exact path="/user/settings/*" element={<Settings user={user} userData={userData} />} />
            <Route path="/user/*" element={<User user={user} setUser={setUser} userData={userData} />} />
            <Route path="*" element={<Main />} />
          </Routes>
          :
          <Routes>
            <Route path="*" element={<Main />} />
            {/* <Loader /> */}
          </Routes>
        }
        {/* <Route path="*" element={<h1>404</h1>} /> */}
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;

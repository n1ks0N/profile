import { Route, Link, Routes, useNavigate } from 'react-router-dom'
import Main from './pages/Main'
import './App.css';
import Login from './components/auth/Login';
import Sign from './components/auth/Sign';
import User from './pages/User'
import Profile from './pages/settings/Profile'
import { useEffect, useState } from 'react';
import profileIcon from './utils/img/profile.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc, getFirestore } from 'firebase/firestore';
import Settings from './pages/settings/Settings';

const App = () => {
  // Main data about user for login or logout status
  // If 'loading' then show on all pages loader
  // If false then redirect on Main page
  // If user data then give allow to User page
  const [user, setUser] = useState('loading')
  
  const [userData, setUserData] = useState([])

  let navigate = useNavigate() // for redirects

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
      } else {
        setUser(false)
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
  console.log(user, userData)
  return (
    <div className="app">
      <header className="header">
        <div>
          
        </div>
        <div>
          <Link to="/">Logo</Link>
        </div>
        <Link to="/login"><img src={profileIcon} /></Link>
      </header>
      <main>
        <Routes>
          <Route path="/user/settings/profile" element={<Profile user={user} />} />
          <Route path="/user/settings" element={<Settings user={user} userData={userData} />} />
          <Route path="/user" element={<User user={user} setUser={setUser} userData={userData} />} />
          <Route path="*" element={<Main />} />
          {/* <Route path="*" element={<h1>404</h1>} /> */}
        </Routes>
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/sign" element={<Sign user={user} setUser={setUser} />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;

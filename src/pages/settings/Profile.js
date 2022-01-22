import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../elements/Input'
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import SettingsHeader from '../../components/settings/SettingsHeder';

const Profile = ({ user, userData }) => {
  let navigate = useNavigate()
  const changeProfile = (e) => {
    e.preventDefault()
    const { name, surname, city, phone, mail } = e.target.elements
    setDoc(doc(getFirestore(), "users", user.email), {
      name: name.value.trim().split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join(''),
      surname: surname.value.trim().split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join(''), 
      city: city.value.trim().split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join(''), 
      phone: phone.value.trim(),
      mail: mail.value.trim()
    }, { merge: true }).then(() => navigate('/user/settings'));

  }
  return (
    <div className='settings-wrap'>
      <SettingsHeader title="Личные данные" />
      <div>
        <form onSubmit={changeProfile}>
          <Input type="text" placeholder="Иван" label="Имя" id="name" defaultValue={userData.name} required={true} />
          <Input type="text" placeholder="Иванов" label="Фамилия" id="surname" defaultValue={userData.surname} required={true} />
          <Input type="text" placeholder="Москва" label="Город" id="city" defaultValue={userData.city} required={true} />
          <Input type="number" placeholder="8 999 999 99 99" label="Телефон" id="phone" defaultValue={userData.phone} required={true} />
          <Input type="email" placeholder="example@gmail.com" label="Почта" id="mail" defaultValue={userData.mail} required={true} />
          <button type='submit' className='btn btn-app'>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
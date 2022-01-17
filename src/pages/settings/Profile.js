import { useEffect } from 'react'
import Input from '../../elements/Input'
import { doc, setDoc, getFirestore } from "firebase/firestore"; 

const Profile = ({ user }) => {
  const changeProfile = (e) => {
    e.preventDefault()
    const { name, surname, city, phone, mail } = e.target.elements
    setDoc(doc(getFirestore(), "users", user.email), {
      name: name.value,
      surname: surname.value, 
      city: city.value, 
      phone: phone.value,
      mail: mail.value
    }, { merge: true });
    
  }
  return (
    <div>
      <div>
        <form onSubmit={changeProfile}>
          <Input type="text" placeholder="Иван" label="Имя" id="name" defaultValue={''} required={true} />
          <Input type="text" placeholder="Иванов" label="Фамилия" id="surname" defaultValue={''} required={true} />
          <Input type="text" placeholder="Москва" label="Город" id="city" defaultValue={''} required={true} />
          <Input type="number" placeholder="8 999 999 99 99" label="Телефон" id="phone" defaultValue={''} required={true} />
          <Input type="email" placeholder="example@gmail.com" label="Почта" id="mail" defaultValue={''} required={true} />
          <button type='submit' className='btn btn-primary'>Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
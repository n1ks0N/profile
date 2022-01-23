import { useLayoutEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getFirestore } from "firebase/firestore"
import { setDoc, doc } from "firebase/firestore"
import SettingsHeader from "../../components/settings/SettingsHeder"
import Textarea from '../../elements/Textarea'
import Input from "../../elements/Input"
import plusIcon from '../../utils/img/plus.svg'

const About = ({ user, userData }) => {
  let navigate = useNavigate()
  const videosArray = userData?.videos.map((item, i) => ({ defaultValue: item, id: i }))
  const [inputsArray, setInputsArray] = useState(videosArray.length > 0 ? videosArray : [{ defaultValue: '', id: 0 }])
  const addInput = () => {
    setInputsArray(prev => prev.concat({ defaultValue: '', id: prev[prev.length - 1].id + 1 }))
  }
  const changeAbout = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const { about } = elements
    const fieldsArray = []
    inputsArray.forEach((item, i) => {
      if (elements[`url-${i}`].value.trim() !== '') {
        fieldsArray.push(elements[`url-${i}`].value.trim())
      }
    })
    setDoc(doc(getFirestore(), "users", user.email), {
      about: about.value.trim(),
      videos: fieldsArray
    }, { merge: true }
    ).then(() => navigate('/user/settings'))
  }
  useLayoutEffect(() => {
    if (!user) {
      // navigate('/login')
      window.location = '/login'
    }
  }, [user])
  return (
    <div className="settings-wrap">
      <SettingsHeader title="О себе" />
      <form onSubmit={changeAbout}>
        <Textarea placeholder="Введите текст" label="Расскажите о себе" id="about" defaultValue={userData.about} required={true} />
        {inputsArray.map((item, i) => <Input key={i} type='url' placeholder="https://youtube.com/example" label="Ссылка на видео" id={`url-${item.id}`} defaultValue={item.defaultValue} required={false} />)}
        <button type="button" className="btn btn-link btn-add" onClick={addInput}><img src={plusIcon} />Добавить ссылку на видео</button>
        <button type='submit' className='btn btn-app'>Сохранить</button>
      </form>
    </div>
  )
}

export default About
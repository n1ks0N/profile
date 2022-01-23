import { useState, useEffect, useLayoutEffect } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { onSnapshot, doc, getFirestore, setDoc, getDoc } from "firebase/firestore"
import SettingsHeader from "../../components/settings/SettingsHeder"
import Select from "react-select"
import Input from "../../elements/Input"
import Textarea from '../../elements/Textarea'
import { fb } from "../../utils/constants/firebase"

const Facts = ({ user, userData }) => {
  const [options, setOptions] = useState([])
  const [resultItem, setResultItem] = useState(false)
  const [defaultText, setDefaultText] = useState('')
  const [defaultLink, setDefaultLink] = useState('')
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation()
  let navigate = useNavigate()
  useLayoutEffect(() => {
    const paths = location.pathname.split('/')
    const lastPath = paths.pop()
    if (lastPath !== 'facts') {
      getDoc(doc(getFirestore(), "users", user.email)).then(docSnap => {
        if (docSnap.exists()) {
          const item = docSnap.data()?.facts.find(item => item.value === lastPath)
          setResultItem(item)
          setDefaultText(item.text)
          setDefaultLink(item.link)
        } else {
          console.log("No such document!");
        }
      })
    }
  }, [])
  useEffect(() => {
    const unsub = onSnapshot(doc(getFirestore(), "data", 'user'), (doc) => {
      const factsArray = doc.data()?.facts
      setOptions(factsArray)
    });
  }, [])
  const chooseItem = (item) => {
    setResultItem(item)
  }
  const changeFacts = (e) => {
    e.preventDefault()
    const { text, link } = e.target.elements
    if (resultItem && text.value.trim().length > 0) {
      let factsArray = userData?.facts
      const newFact = {
        ...resultItem,
        text: text.value.trim(),
        link: link.value.trim(),
        stage: factsArray.length
      }
      const index = factsArray.findIndex(item => item.value === newFact.value)
      if (index !== -1) {
        factsArray[index] = newFact
      } else {
        factsArray = factsArray.concat(newFact)
      }
      setDoc(doc(getFirestore(), "users", user.email), {
        facts: factsArray
      }, { merge: true }
      ).then(() => navigate('/user/settings'))
    }
  }
  useLayoutEffect(() => {
    if (!user) {
      // navigate('/login')
      window.location = '/login'
    }
  }, [user])
  return (
    <div className="settings-wrap">
      <SettingsHeader title="Факты" />
      <form onSubmit={changeFacts}>
        <p>Факт о вас</p>
        <Select options={options} placeholder="Выберите" className="settings-interests__select" onChange={(item) => chooseItem(item)} value={resultItem} />
        <Textarea placeholder="Введите текст" label="Пояснение" id="text" defaultValue={defaultText} required={true} />
        <Input type="url" placeholder="https://example.com/" label="Ссылка на дополнительные материалы" id="link" defaultValue={defaultLink} required={false} />
        <button type="submit" className="btn btn-app settings-interests__btn">Сохранить</button>
      </form>
    </div>
  )
}

export default Facts
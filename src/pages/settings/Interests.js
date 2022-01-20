import { useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore, setDoc } from "firebase/firestore";
import Select from 'react-select'
import SettingsHeader from "../../components/settings/SettingsHeder"

const Interests = ({ user, userData }) => {
  const [options, setOptions] = useState([])
  const [resultItems, setResultItems] = useState(userData?.interests)
  useEffect(() => {
    const unsub = onSnapshot(doc(getFirestore(), "data", 'user'), (doc) => {
      const arrInterests = doc.data()?.interests
      setOptions(arrInterests)
    });
  }, [])
  const chooseItems = (items) => {
    setResultItems(items)
  }
  const changeInterests = (e) => {
    e.preventDefault()
    setDoc(doc(getFirestore(), "users", user.email), {
      interests: resultItems
    }, { merge: true }
    )
  }
  return (
    <div className="settings-wrap">
      <SettingsHeader title="Интересы" />
      <div>
        <form onSubmit={changeInterests}>
          <Select options={options} isMulti placeholder="Выберите" className="settings-interests__select" onChange={(items) => chooseItems(items)} />
          <button type="submit" className="btn btn-app settings-interests__btn">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Interests
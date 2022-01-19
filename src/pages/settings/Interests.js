import { useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore, setDoc } from "firebase/firestore";
import Select from 'react-select'
import SettingsHeader from "../../components/settings/SettingsHeder"

const Interests = ({ user }) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(doc(getFirestore(), "data", 'user'), (doc) => {
      const arrInterests = doc.data().interests.map((item) => ({ ...item, status: false }))
      setOptions(arrInterests)
    });
  }, [])
  const changeOptionStatus = (chosenItem) => {
    const arr = options.map(item => {
      if (chosenItem.find(i => i.id === item.id)) {
        return { ...item, status: !item.status }
      } else {
        return { ...item }
      }
    })
    arr.forEach(item => console.log(item))
    options.forEach(item => console.log(item))
    setOptions(arr)
  }
  const changeInterests = (e) => {
    e.preventDefault()
    console.log(options.filter(item => !!item.status))
    // setDoc(doc(getFirestore(), "users", user.email), {
    //   interests: options.filter(item => !!item.status)
    // }, { merge: true }
    // )
  }
  return (
    <div className="settings-wrap">
      <SettingsHeader title="Интересы" />
      <div>
        <form onSubmit={changeInterests}>
          <Select options={options} isMulti placeholder="Выберите" className="settings-interests__select" onChange={(chosenItem) => changeOptionStatus(chosenItem)} />
          <button type="submit" className="btn btn-app settings-interests__btn">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default Interests
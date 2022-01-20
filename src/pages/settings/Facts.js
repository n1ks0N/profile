import { Link } from "react-router-dom"
import SettingsHeader from "../../components/settings/SettingsHeder"
import Select from "react-select"
import Input from "../../elements/Input"
import Textarea from '../../elements/Textarea'
import { useState } from "react"

const Facts = ({ user, userData }) => {
  const [options, setOptions] = useState([])
  const chooseItems = (items) => {

  }
  return (
    <div className="settings-wrap">
      <SettingsHeader title="Факты" />
      <Select options={options} placeholder="Выберите" className="settings-interests__select" onChange={(items) => chooseItems(items)} />
      <Textarea placeholder="Введите текст" label="Пояснение" id="text" defaultValue={''} required={true} />
      <Input type="url" placeholder="https://example.com/" label="Ссылка на дополнительные материалы" id="link" defaultValue={''} required={false} />
    </div>
  )
}

export default Facts
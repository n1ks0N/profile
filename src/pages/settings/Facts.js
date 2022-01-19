import { Link } from "react-router-dom"
import SettingsHeader from "../../components/settings/SettingsHeder"
import Input from "../../elements/Input"

const Facts = () => {
  
  return (
    <div className="settings-wrap">
      <SettingsHeader title="Факты" />
      <Input type="text" placeholder="Достижение года" label="Факт о вас" id="adv" defaultValue={''} required={true} />
    </div>
  )
}

export default Facts
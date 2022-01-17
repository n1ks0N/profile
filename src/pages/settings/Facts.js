import Input from "../../elements/Input"

const Facts = () => {
  return (
    <div>
      <Input type="text" placeholder="Достижение года" label="Факт о вас" id="adv" defaultValue={''} required={true} />
    </div>
  )
}

export default Facts
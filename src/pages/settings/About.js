import Input from "../../elements/Input"

const About = () => {
  return (
    <div>
      <Textarea placeholder="Введите текст" label="Расскажите о себе" id="about" defaultValue={''} required={true} />
      <Input type='url'  placeholder="https://youtube.com/example" label="Ссылка на видео" id="name" defaultValue={''} required={true} />
    </div>
  )
}

export default About
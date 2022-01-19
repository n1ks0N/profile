import { useRef, useState } from "react"

const Input = ({ label, id, placeholder, defaultValue, required }) => {
  const [value, setValue] = useState(defaultValue || '')
  const inputRef = useRef(defaultValue || '')
  const change = () => {
    setValue(inputRef.current.value)
  }
  return (
    <div className="mb-3">
      <label htmlFor={`${id}FormControlTextarea1`} className="form-label">{label}</label>
      <textarea className="form-control" id={`${id}FormControlTextarea1`} placeholder={placeholder} name={id} ref={inputRef} onChange={change} required={required} value={value} />
    </div>
  )
}

export default Input
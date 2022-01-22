import { useRef, useState, useEffect } from "react"

const Input = ({ label, id, placeholder, type, defaultValue, required }) => {
  const [value, setValue] = useState(defaultValue || '')
  const inputRef = useRef(defaultValue || '')
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  const change = () => {
    setValue(inputRef.current.value)
  }
  return (
    <div className="mb-3">
      <label htmlFor={`${id}FormControlInput1`} className="form-label">{label}</label>
      <input type={type} className="form-control" id={`${id}FormControlInput1`} placeholder={placeholder} name={id} ref={inputRef} value={value} onChange={change} required={required} />
    </div>
  )
}

export default Input
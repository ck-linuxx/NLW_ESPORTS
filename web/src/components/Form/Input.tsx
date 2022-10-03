import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input({id, placeholder, type}: InputProps) {
  return (
    <input 
    id={id} 
    type={type} 
    placeholder={placeholder}
    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"/>
  )
}
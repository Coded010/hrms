'use client'

import { useState } from "react"
import { InputStateConfig } from "./FieldStateData.jsx"

export default function Field( { 
  type = 'text', 
  placeholder, 
  disabled = false, 
  state = 'default', 
  message = '', 
  registration = {}, 
  onFocus, 
  onBlur, 
  ...props 
} ) {
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = (e) => {  
    setIsFocused(true)
    if (onFocus) 
         onFocus(e)
    if (registration.onFocus) 
         registration.onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) 
         onBlur(e)
    if (registration.onBlur) 
         registration.onBlur(e)
  }
  
  const currentState = disabled ? 'disabled' : state
  const config = (InputStateConfig && InputStateConfig[currentState]) || 
                 (InputStateConfig && InputStateConfig.default) || 
                 { container: '', message: '', icon: null }

  return (
    <div className='flex flex-col gap-1 w-full'>
      <div className={`relative flex items-center rounded-md px-3 py-2 transition-all duration-300 border ${config.container}`}>

        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled || currentState === 'disabled'}
          className='bg-transparent border-none outline-none appearance-none w-full text-gray-900 disabled:cursor-not-allowed'
          {...registration}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {config.icon && <div className='ml-2 shrink-0'>{config.icon}</div>}
      </div>

      {message && currentState !== 'default' && (
        <p className={`text-sm select-none ${config.message}`}>
          {message}
        </p>
      )}
    </div>
  )
}
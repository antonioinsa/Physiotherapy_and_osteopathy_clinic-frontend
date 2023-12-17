import React from 'react'
import './CustomInput.css'

export const CustomInput = ({ design, type, name, placeholder, functionProp, functionBlur, functionFocus, msgError, disabled, value }) => {
   return (
      <div>
         <input
            disabled={disabled}
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value || undefined}
            onChange={(e) => functionProp(e)}
            onBlur={(e) => functionBlur(e)}
            onFocus={(e) => functionFocus(e)}
         />
         {msgError && <div className="errorMessageCustomInput">{errorMessage}</div>}
      </div>
   )
}
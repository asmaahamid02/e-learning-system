import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
const SelectInput = (props) => {
  const [options, setOptions] = useState(props.options)
  return (
    <div className='input-box'>
      <div className='inner-input'>
        <span className='prefix'>
          <FontAwesomeIcon
            icon={props.icon}
            className={props.iconClass}
            size={props.iconSize}
          />
        </span>
        <select className='input' name={props.name}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <span
        className={`display-message error ${!props.errorMessage && 'hide'}`}
      >
        {props.errorMessage}
      </span>
    </div>
  )
}

export default SelectInput

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SelectInput = (props) => {
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
          {props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
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

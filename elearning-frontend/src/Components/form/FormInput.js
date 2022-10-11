import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const FormInput = (props) => {
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
        <input
          className='input'
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>

      <span
        className={`display-message error ${!props.errorMessage && 'hide'}`}
      >
        {props.errorMessage}
      </span>
    </div>
  )
}

export default FormInput

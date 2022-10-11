import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Button = (props) => {
  return (
    <button className={props.classes} id={props.id}>
      {props.icon ? (
        <FontAwesomeIcon
          icon={props.icon}
          className={props.iconClass}
          size={props.iconSize}
        />
      ) : (
        props.text
      )}
    </button>
  )
}

export default Button

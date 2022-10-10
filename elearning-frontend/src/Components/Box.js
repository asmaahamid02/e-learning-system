import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Box = (props) => {
  return (
    <div
      key={props.id}
      className={`item ${props.color}`}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={props.iconTop} className='box-icon' />
      <h3>
        <FontAwesomeIcon icon={props.iconBottom} />
        {props.title}
      </h3>
    </div>
  )
}

export default Box

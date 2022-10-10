import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Box = (props) => {
  return (
    <div className={`item ${props.color}`}>
      <FontAwesomeIcon icon={props.iconTop} className='box-icon' />
      <h3>
        <FontAwesomeIcon icon={props.iconBottom} />
        {props.title}
      </h3>
    </div>
  )
}

export default Box

import Box from '../Box'
import {
  faCirclePlus,
  faShapes,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons'
import UserInfo from '../../Services/UserInfo'

const Assignment = (props) => {
  const addArray = {
    title: 'Add Assignemt',
    buttonText: 'Add',
  }

  const submitArray = {
    title: 'Submit Assignemt',
    buttonText: 'Submit',
  }

  const viewArray = {
    title: 'View Assignemts',
  }

  //Box onClick function to render the right modal
  const fillInputs = (e) => {
    if (e.currentTarget.textContent.includes('Add')) {
      props.setModalProps(addArray)
      props.setModalForm('addAssignemt')
      props.setShowModal(true)
    } else if (e.currentTarget.textContent.includes('Submit')) {
      props.setModalProps(submitArray)
      props.setModalForm('submitAssignemt')
      props.setShowModal(true)
    } else if (e.target.textContent.includes('View')) {
      props.setModalProps(viewArray)
      props.setModalForm('viewAssignemts')
      props.setShowModal(true)
    }
  }

  return (
    <>
      <Box
        color='orange'
        iconTop={faFolderPlus}
        iconBottom={faCirclePlus}
        title={
          UserInfo.getRole() == 'instructor'
            ? 'Add Assignmets'
            : 'Submit Assignmets'
        }
        onClick={fillInputs}
      />
      <Box
        color='purple'
        iconTop={faShapes}
        iconBottom={faCirclePlus}
        title='View Assignments'
        onClick={fillInputs}
      />
    </>
  )
}

export default Assignment

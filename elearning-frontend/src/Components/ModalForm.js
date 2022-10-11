import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddUserForm from './user/AddUserForm'
import InstructorCourseForm from './instructors/InstructorCourseForm'
import ViewInstructors from './instructors/ViewInstructors'
import ViewStudents from './student/ViewStudents'
import AddCourseForm from './course/AddCourseForm'
import ViewCourses from './course/ViewCourses'
import SubmitAssignmentForm from './assignment/SubmitAssignmentForm'

const ModalForm = (props) => {
  const handleModalShow = () => {
    // props.setModalProps({ ...props.modalProps, ['showModal']: false })
    props.setShowModal(false)
  }
  return (
    <div className='modal-background flex' id='form-modal'>
      <div className='modal-container flex'>
        <div className='modal-header flex center-vertical'>
          <h3 className='header-title'>{props.title}</h3>
          <FontAwesomeIcon
            icon={faXmark}
            className='icon icon-dark'
            size='xl'
            onClick={handleModalShow}
          />
        </div>
        <div className='modal-body'>
          <>
            {props.modalForm == 'addInstructor' && (
              <AddUserForm role='instructor' />
            )}
            {props.modalForm == 'assignCourseToInstructor' && (
              <InstructorCourseForm />
            )}
            {props.modalForm == 'viewInstructors' && <ViewInstructors />}
            {props.modalForm == 'addStudent' && <AddUserForm role='student' />}
            {/* {props.modalForm == 'assignCourseToStudent' && (
              <StudentCourseForm />
            )} */}
            {props.modalForm == 'viewStudents' && <ViewStudents />}
            {props.modalForm == 'addCourse' && <AddCourseForm />}
            {props.modalForm == 'viewCourses' && <ViewCourses />}
            {props.modalForm == 'submitAssignemt' && <SubmitAssignmentForm />}
          </>
        </div>
        <div className='modal-footer flex'>
          <button
            className='btn btn-green btn-cancel'
            onClick={handleModalShow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalForm

import Table from '../Table'
import { useState, useCallback, useEffect } from 'react'
import User from '../../API/user'
import Moment from 'moment'

const ViewInstructors = () => {
  /*CONSTANTS*/
  const titles = ['Name', 'Email', 'Gender', 'Phone', 'Joined At']
  const [instructors, setInstructors] = useState([])

  //to fill instructors options
  const fetchInstructors = useCallback(async () => {
    try {
      const response = await User.getInstructors()

      let output = []
      if (response.status == 200) {
        if (!response.data) {
          output.push([])
        } else {
          response.data.map((instructor) => {
            output.push([
              instructor.name,
              instructor.email,
              instructor.gender,
              instructor.phone,
              Moment(instructor.created_at).format('MMM Do YY'),
            ])
          })
        }
        setInstructors(output)
        console.log(output)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchInstructors()
  }, [fetchInstructors])

  /*FUNCTIONS*/

  /*USE EFFECT*/

  return (
    <>
      {/* <SelectInput
        icon={faUsers}
        iconClass='icon-green'
        iconSize='lg'
        name='instructor'
        options={options}
      /> */}
      <Table titles={titles} rows={instructors} />
    </>
  )
}

export default ViewInstructors

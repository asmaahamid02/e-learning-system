import Table from '../Table'
import { useState, useCallback, useEffect } from 'react'
import User from '../../API/user'
import Moment from 'moment'

const ViewStudents = () => {
  /*CONSTANTS*/
  const titles = ['Name', 'Email', 'Gender', 'Phone', 'Joined At']
  const [students, setStudents] = useState([])

  //to fill instructors options
  const fetchStudents = useCallback(async () => {
    try {
      const response = await User.getStudents()

      let output = []
      if (response.status == 200) {
        if (!response.data) {
          output.push([])
        } else {
          response.data.map((item) => {
            output.push([
              item.name,
              item.email,
              item.gender,
              item.phone,
              Moment(item.created_at).format('MMM Do YY'),
            ])
          })
        }
        setStudents(output)
        console.log(output)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  /*FUNCTIONS*/

  /*USE EFFECT*/

  return (
    <>
      <Table titles={titles} rows={students} />
    </>
  )
}

export default ViewStudents

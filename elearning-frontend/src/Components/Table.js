const Table = (props) => {
  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            {props.titles.map((title, indexTH) => (
              <th key={indexTH}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows ? (
            props.rows.map((row, indexTR) => (
              <tr key={indexTR}>
                {row.map((item, indexTD) => (
                  <td key={indexTD}>{item}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={props.titles.length}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Table

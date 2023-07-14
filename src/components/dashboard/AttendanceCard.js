import React from 'react'

export default function AttendanceCard({data}) {
  const attendance = JSON.parse(data)
  return (
    <div className='attendance-box'>
        <div>
            {attendance?.studentName}
            -
            {attendance?.studentRollNo}
        </div>
    </div>
  )
}

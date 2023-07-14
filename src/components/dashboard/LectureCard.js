import React from 'react'

export default function LectureCard({lecture}) {
  const lecture1 = JSON.parse(lecture)
  return (
    <div className='lecture-box'>
        <div>
            {lecture1?.lecTopic}
        </div>
        <div > 
            {lecture1?.lecStartTime} - {lecture1?.lecEndTime}
        </div>

    </div>
  )
}

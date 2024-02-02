import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, StartIcon } from '../../utils/icons'




export const Card = (props: { taskDetails: any, taskType: String }) => {
  const [dateState, setDate] = useState("")
  useEffect(() => {
    let dateString = props?.taskDetails?.due_date
    const dateObject = new Date(dateString);
    const now = new Date();
    const options = { hour: 'numeric', day: 'numeric', weekday: 'short', month: 'short', year: '2-digit', } as Intl.DateTimeFormatOptions;
    let formattedDate = dateObject.toLocaleString('en-US', options);
    if (dateObject.toDateString() === now.toDateString()) {
      formattedDate = 'Today';
    }
    setDate(formattedDate)
  }, [])
  return (
    <Link
      to={props?.taskDetails?.todoId}
      className={`hover:scale-105
      flex justify-between flex-col 
      ${props.taskDetails.completed ? "bg-gray-200" :
          (new Date(props?.taskDetails?.due_date)?.toDateString() === new Date().toDateString()) ?
            "bg-orange-200" : (new Date(props?.taskDetails?.due_date)?.toDateString() < new Date().toDateString()) ?
              'bg-red-200' : "bg-green-200"}

      px-3 py-2 drop-shadow-md rounded-md w-[inherit] h-[10rem]`}>
      <div>
        <div className='flex items-center justify-between pb-3'>
          <div className='text-xs flex gap-x-1 items-center'>
            {dateState?.includes("Today") && <StartIcon />}
            <span className=' font-bold'> {dateState}</span>
          </div>
          <ArrowIcon />
        </div>

        <div className='font-light text-sm line-clamp-1' >{props?.taskDetails?.title} </div>
        <span className='text-md line-clamp-3 tracking-wide'>
          {props?.taskDetails?.description}
        </span>
      </div>
      <div className='text-xs text-right italic'>{props?.taskDetails?.completed ? "completed" : "pending"} </div>
    </Link>
  )
}

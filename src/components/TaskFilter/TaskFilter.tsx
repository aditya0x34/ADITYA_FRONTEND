import React from 'react'
import { Card } from '../Card/Card'
import useSWR from 'swr'

const taskFetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      }
    }).then((data) => data.json())
    return response
  } catch (err: any) {
    return err instanceof Error ? err : new Error(err)
  }
}
export const TaskFilter = (props: { taskType: string }) => {
  const { data, mutate, error, isLoading } = useSWR(process.env.REACT_APP_API_BACKEND_URL + `tasks/filter?type=${props.taskType}`, taskFetcher);
  if(error){
    return (
    <div>
        Somthing went Wrong try Again Later
    </div>
    )
  }
  return (
    <div className=' w-[15rem]  no-scrollbar drop-shadow-2xl  p-2 rounded-md h-[90vh] overflow-auto'>
      <div className='drop-shadow-md text-sm capitalize font-bold sticky z-10 top-0 bg-white rounded-md py-1 px-1'>
        <span> {props?.taskType}</span>
      </div>
      {isLoading&& "loading"}
      <div className='py-3 grid gap-2'>
        {
          data?.map((taskDetails:any) => (
            <Card taskDetails={taskDetails} taskType={props.taskType} />
          ))
        }

      </div>
    </div>

  )
}

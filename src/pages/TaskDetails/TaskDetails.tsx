import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { LoadingIcon } from '../../utils/icons';
import { Navigate } from "react-router-dom";

const deleteFetcher = async (url: string, { arg }: { arg: any }) => {
  try {
    const data = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
    }).then((data) => data.json());
    return data;
  } catch (err) {
    return new Error("Something went wrong try again")
  }

}

export const DeleteBtn = (props: { taskId: string }) => {
  const { trigger, isMutating, data, error } = useSWRMutation(`${process.env.REACT_APP_API_BACKEND_URL}tasks/${props.taskId}`, deleteFetcher, {});

  return (
    <div className='flex flex-col-reverse'>
      <button onClick={() => trigger({ endPoint: props.taskId })} className=' bg-black text-sm text-white font-bold rounded-md px-3 py-1' >
        {!isMutating ? "Delete" : <LoadingIcon />}
      </button>
      {!isMutating && <div className='text-red-800 font-bold'>
        {data?.status?.includes("error") && data?.message}
        {data?.status?.includes("ok") && <Navigate to="/" replace={true} />}
      </div>}

    </div>
  )
}

const UpdateBtn = () => {
  return (
    <button className='bg-black text-sm text-white font-bold rounded-md px-3 py-1'>Update</button>
  )
}


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
export const TaskDetails = (props: {}) => {
  const { taskId } = useParams();
  const { data, mutate, error, isLoading } = useSWR(process.env.REACT_APP_API_BACKEND_URL + `tasks/${taskId}`, taskFetcher);
  const [dateState, setDate] = useState("")
  useEffect(() => {
    if (data == null) return
    let dateString = data?.data?.due_date
    const dateObject = new Date(dateString);
    const now = new Date();
    const options = { hour: 'numeric', day: 'numeric', weekday: 'short', month: 'short', year: '2-digit', } as Intl.DateTimeFormatOptions;
    let formattedDate = dateObject.toLocaleString('en-US', options);
    if (dateObject.toDateString() === now.toDateString()) {
      formattedDate = 'Today';
    }
    setDate(formattedDate)
  }, [data])

  if (error || data?.status?.includes("error")) {
    if (data?.message?.includes("Task not found with ID: 7b691953d")) {
      return (
        <>
          404 PAGE NOT FOUND
        </>
      )
    }
    return (
      <div>
        <div>
          Somthing Went Wrong
        </div>
        {data?.message}
      </div>
    )
  }
  return (
    <div>
      <div className={` h-[30vh] bg-[url(https://cdn5.vectorstock.com/i/1000x1000/93/79/back-to-school-drawing-background-on-copy-book-vector-5629379.jpg)] relative`}>
        <div className='gap-x-3 flex items-end absolute bottom-2 left-2'>
          <Link to={"/update/" + taskId}>
            <UpdateBtn />
          </Link>
          <DeleteBtn taskId={data?.data?.todoId} />
        </div>
      </div>
      {!isLoading ?
        <>
          <div className='pb-3 text-3xl tracking-wide	 font-bold text-pink-600'>
            {data?.data?.title}
          </div>
          <div className='pb-3 tracking-wide	'>
            {data?.data?.description}
          </div>
          <div className='flex  gap-2 flex-wrap'>
            <div className='bg-pink-400 w-fit rounded-xl tracking-wide	 font-extrabold text-white px-2  '><span>{dateState} </span> </div>
            <div className='bg-pink-400 w-fit rounded-xl tracking-wide	 font-extrabold text-white px-2  '><span>{data?.data?.completed ? "Completed" : "Pending..."} </span> </div>
          </div>
        </>
        : "Loading...."
      }
    </div>
  )
}

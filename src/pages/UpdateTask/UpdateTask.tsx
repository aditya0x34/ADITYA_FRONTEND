import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const createNewTask = async (url: string, { arg }: { arg: any }) => {
  const { body } = arg
  try {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body)
    }).then((data) => data.json());
    return data;
  } catch (err) {
    return new Error("Something went wrong try again")
  }

}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const UpdateTask = (props: {}) => {
  const { taskId } = useParams();
  const { data, error, mutate, isLoading } = useSWR(process.env.REACT_APP_API_BACKEND_URL + 'tasks/' + taskId, fetcher);
  const [updateMessage, setUpdateMessage] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

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
  if (isLoading) {
    return (
      <div>
        Loading..
      </div>
    )
  }
  const onUpdate = async (updatedTaskData: any) => {
    try {
      setUpdateMessage('');
      const updatedTask = await fetch(process.env.REACT_APP_API_BACKEND_URL + `tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      }).then((res) => res.json())
      setUpdateMessage('Update completed successfully.');

    } catch (err) {
      setUpdateMessage('Error updating task. Please try again.');

    }

  }
  return (
    <div>
      <div className='p-8 bg-gray-100 rounded-lg'>
        <div className='font-bold text-[#95006C] text-2xl font-mono'>
          Update Task
        </div>
        <div className='text-[#FFB548] text-sm italic underline'>
          Empower Your Productivity, One Task at a Time
        </div>
      </div>
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className='flex flex-col '>
          <div className='md:flex none flex-wrap gap-x-3'>

            <div className='mb-4'>
              <input
                maxLength={50}
                {...register("title", {
                  value: `${data?.data?.title}`,
                  required: { value: true, message: 'required Title' }
                })}
                type='text' placeholder='Title' className='w-full md:w-auto  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
              {errors.title && <div className='italic text-xs text-red-500'>{errors?.title?.message as string}</div>}
            </div>
            <div className='mb-4'>
              <input
                {...register("description", {
                  value: `${data?.data?.description}`,
                  required: { value: true, message: 'required Description' }
                })}
                type='text' placeholder='Description' className='w-full md:w-auto  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
              {errors.description && <div className='italic text-xs text-red-500'>{errors?.description?.message as string}</div>}
            </div>
          </div>

          <div className='md:flex none flex-wrap gap-x-3'>
            <div className='mb-4'>
              <input
                {...register("due_date", {
                  value: `${data?.data?.due_date}`,
                  required: { value: true, message: 'required Time' }
                })}
                type='datetime-local' className='w-full md:w-auto p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
              {errors.due_date && <div className='italic text-xs text-red-500'>{errors?.due_date?.message as string}</div>}
            </div>

            <div
              className='mb-4'>
              <input type="checkbox"
                {...register("completed", {
                  value: data?.data?.completed
                })}

              /> {!data?.data?.completed ? "Completed" : "Unfinished"}
            </div>
          </div>
          <div>
            <div className='flex  gap-3'>
              <button className={`flex place-content-center w-20 h-9 font-bold text-sm  bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green`}>
                Update
              </button>
            </div>
            {updateMessage && <div>{updateMessage}</div>}
          </div>
        </div>
      </form>
    </div>
  )
}

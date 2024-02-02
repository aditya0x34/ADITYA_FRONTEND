import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation'

const LoadingIcon = () => (
  <svg className="animate-spin h-4 w-4 mr-3 ..." viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      clipRule="evenodd"
      opacity={0.2}
    />
    <path
      fill="currentColor"
      d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z"
    />
  </svg>
)


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

export const AddTask = (props: {}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { trigger, isMutating, data, error } = useSWRMutation(`${process.env.REACT_APP_API_BACKEND_URL}tasks`, createNewTask, {});
  const onSubmit = (todoDetails: any) => {
    trigger({ body: todoDetails })
  }
  if (error) {
    return (
      <div>
        Something went wrong. Please try again after some time.
        <div>
          {error?.message}
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='p-8 bg-gray-100 rounded-lg'>
        <div className='font-bold text-[#95006C] text-2xl font-mono'>
          Add Task
        </div>
        <div className='text-[#FFB548] text-sm italic underline'>
          Empower Your Productivity, One Task at a Time
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col '>
          <div className='md:flex none flex-wrap gap-x-3'>

            <div className='mb-4'>
              <input
                maxLength={50}
                {...register("title", {
                  required: { value: true, message: 'required Title' }
                })}
                type='text' placeholder='Title' className='w-full md:w-auto  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
              {errors?.title && <div className='italic text-xs text-red-500'>{errors?.title?.message as string}</div>}
            </div>
            <div className='mb-4'>
              <input
                {...register("description", {
                  required: { value: true, message: 'required Description' }
                })}
                type='text' placeholder='Description' className='w-full md:w-auto  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
              {errors?.description && <div className='italic text-xs text-red-500'>{errors?.description?.message as string}</div>}
            </div>
          </div>
          <div className='mb-4'>
            <input
              {...register("due_date", {
                required: { value: true, message: 'required Description' }
              })}
              type='datetime-local' className='w-full md:w-auto p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500' />
            {errors?.due_date && <div className='italic text-xs text-red-500'>{errors?.due_date?.message as string}</div>}
          </div>
          <div>
            <button disabled={isMutating} className={`flex place-content-center w-20 h-9 font-bold text-sm  ${!isMutating ? 'bg-green-500' : 'bg-gray-400'}  text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green`}>
              {!isMutating ? "Submit" : <LoadingIcon />}
            </button>
            {/* {data?.status?.includes("ok") && <span className=' text-green-600'>{data?.message}</span>} */}
            {data?.status?.includes("ok") && <Navigate to="/" replace={true} />}
            {data?.status?.includes("error") && <span className='text-red-600'>{data?.message}</span>}
          </div>
        </div>
      </form>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { TaskFilter } from '../../components/TaskFilter/TaskFilter'
export const TaskList = (props: {}) => {
  return (
    <div>
      <div className={` h-[30vh] bg-[url(https://files.catbox.moe/geukbz.png)]`}>
      </div>
      <div className='mx-auto max-w-full sm:max-w-[90%]'>
        <div className='py-2'>
          <Link to={"/addtask"}>
            <button className='bg-orange-400 px-3 py-1  rounded text-white text-sm font-extrabold'>Add Task</button>
          </Link>
        </div>
        <div className='bg-[#f9f9ff] rounded-md p-4 '>
          <div className='flex gap-4 flex-wrap '>
            <TaskFilter taskType='Todo' />
            <TaskFilter taskType='inProgress' />
            <TaskFilter taskType='Completed' />
            <TaskFilter taskType='OverDue' />
          </div>
        </div>
      </div>
    </div>
  )
}



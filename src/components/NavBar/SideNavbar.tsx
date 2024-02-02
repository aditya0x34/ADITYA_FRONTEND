import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {UpArrow, PencilIcon, DownArrow, ListIcon,MenuIcon,AddIcon  } from '../../utils/icons'


export const SideNavbar = (props: {}) => {
  const [todoState, setTodoMenu] = useState(true);
  return (
    <div className='grid grid-cols-[1fr_6fr] md:grid-cols-[1fr_4fr]  lg:grid-cols-[1fr_7fr]'>
      <div className='bg-[#f9f9f9]  h-auto min-h-[100vh]  capitalize font-sans'>
        <Link to={"/"}>
          <div className='flex px-4 py-2 items-center justify-center font-extrabold text-2xl'>
            <div className='pr-1 '>
              <PencilIcon />
            </div>
            <div className='hidden sm:block'>
              <span className='text-[#FFB548]'>Leap<span className='text-[#330073]'>Todo</span></span>
            </div>
          </div>
        </Link>
        <div onClick={() => setTodoMenu((state) => !state)}
          className='flex  sm:justify-between justify-center px-3 py-2 items-center  text-md font-light   text-[gray]'>
          <div className=' sm:justify-start items-center justify-center flex'>
            <div className='sm:hidden block none pr-1 text-black'>
              <MenuIcon />
            </div>
            <div className='hidden sm:block'>
              Menu
            </div>
          </div>
          <div className='pl-3 sm:block hidden'>
            {todoState ? <DownArrow /> : <UpArrow />}
          </div>

        </div>
        {todoState &&
          <div className='px-0 sm:px-6 text-sm '>
            <Link to={"/"} className='flex  py-2 items-center sm:justify-start justify-center  text-md font-light   text-[gray]'>
              <div className='pr-1 '>
                <ListIcon />
              </div>
              <div className='hidden sm:block'>
                Task List
              </div>
            </Link>

            <Link to={"/addtask"} className='flex py-2  sm:justify-start justify-center  text-md font-light   text-[gray]'>
              <div className='pr-1 '>
                <AddIcon />
              </div>
              <div className='hidden sm:block '>
                Add Task
              </div>
            </Link>
          </div>
        }
      </div>
      <Outlet />
    </div >
  )
}

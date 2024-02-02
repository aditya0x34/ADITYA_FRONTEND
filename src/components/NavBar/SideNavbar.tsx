import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
)
const DownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
)
const UpArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
)
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

)
const UrgentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
  </svg>
)

export const SideNavbar = (props: {}) => {
  const [todoState, setTodoMenu] = useState(true);
  return (
    <div className='grid grid-cols-[1fr_6fr] md:grid-cols-[1fr_4fr]  lg:grid-cols-[1fr_7fr]'>
      <div className='bg-[#f9f9f9]  h-auto min-h-[100vh]  capitalize font-sans'>
        <div className='flex px-4 py-2 items-center justify-center font-extrabold text-2xl'>
          <div className='pr-1 '>
            <PencilIcon />
          </div>
          <div className='hidden sm:block'>
            <span className='text-[#FFB548]'>Leap<span className='text-[#330073]'>Todo</span></span>
          </div>
        </div>

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
            <div className='flex  py-2 items-center sm:justify-start justify-center  text-md font-light   text-[gray]'>
              <div className='pr-1 '>
                <ListIcon />
              </div>
              <div className='hidden sm:block'>
                Task List
              </div>
            </div>

            <div className='flex py-2  sm:justify-start justify-center  text-md font-light   text-[gray]'>
              <div className='pr-1 '>
                <UrgentIcon/>
              </div>
              <div className='hidden sm:block '>
                Overview
              </div>
            </div>

          </div>
        }

      </div>
      <Outlet />
    </div>
  )
}

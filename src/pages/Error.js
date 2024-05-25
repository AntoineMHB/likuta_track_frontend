import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/16/solid';
import React from 'react'
import { Link, NavLink, useNavigate, useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError ()
  const navigate = useNavigate()
  console.log("~ Error ~ error", error)
  return (
    <div className="error">
      <h1>Oops! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className='flex-md'>
        <button className='btn btn--dark' onClick={() => {navigate(-1)}}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
       <Link to="/">
         <button className='btn btn--dark'>
           <HomeIcon width={20}/>
           <span> Go home</span>
         </button>
       </Link>

 </div>
    </div>
  )
}
export default Error;
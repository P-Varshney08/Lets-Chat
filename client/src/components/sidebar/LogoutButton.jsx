import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout.js';

function LogoutButton() {
  const {loading, logout} = useLogout()
  return (
    <div className='mt-auto'>
      {!loading ? (
        <TbLogout2 className='w-7 h-7 text-white cursor-pointer' onClick={logout} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  )
}

export default LogoutButton
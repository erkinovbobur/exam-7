import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <>
      <div className='wrapper flex items-center justify-center min-h-screen'>
        <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white rounded-lg shadow-lg'>
          <Link to={"/"} className='mt-8'>
          </Link>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Auth;

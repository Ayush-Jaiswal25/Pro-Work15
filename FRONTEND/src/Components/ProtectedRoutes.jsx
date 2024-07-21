import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { MyContext } from '../ContextAPI.jsx';

function ProtectedRoutes() {

  const {
    LoginFirst, setLoginFirst,

    SessionID, setSessionID, removeSessionID
  } = useContext(MyContext);
  return (SessionID.SessionID !=undefined?<Outlet/>:
  (
    <div>
      {setLoginFirst(true)}
      
      <Navigate to='/' replace={true}/>
    </div>
  ))
}

export default ProtectedRoutes
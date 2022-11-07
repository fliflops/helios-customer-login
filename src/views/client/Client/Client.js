import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {useSelector} from 'react-redux';

import {selectCurrentToken} from '../../../redux/slice/auth.slice';


const Client = () => {
  const token = jwtDecode(useSelector(selectCurrentToken));


  if(token.user_info.user_type !== 'client'){
    return <Navigate to='/404'/>
  }

  return ( <Outlet/>)
}

export default Client
import React from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import {selectCurrentToken} from '../../../redux/slice/auth.slice';



const Admin = () => {
    const token = jwtDecode(useSelector(selectCurrentToken));

    if(token.user_info.user_type !== 'admin'){
        return <Navigate to='/404'/>
    }

    return <Outlet/>
}

export default Admin
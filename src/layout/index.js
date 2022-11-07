import React from 'react';
import {Box} from '@chakra-ui/react';
import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {selectCurrentToken} from '../redux/slice/auth.slice';
import Header from './Header';


const Layout = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    if(!token) {
        return <Navigate to='/login' state={{from:location}} replace/>
    }
    
    return (
        <Box>
            <Header/>
            <Outlet/>
        </Box>
    )
}


export default Layout
import React from 'react';
import jwtDecode from 'jwt-decode';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {selectCurrentToken, selectCurrentUser} from '../redux/slice/auth.slice';
import {Box,Button} from '@chakra-ui/react';
const containerProps = {
  p:3,
  minWidth:'25%',
  height:'sm',
  bg:'white',
  shadow:'sm',
  rounded:'md',  
}


const Content = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
 
  if(token){
    const newToken = jwtDecode(token)
    
    if(user.has_qr) {
        if(newToken.user_info.user_type === 'client') {
            return (
              <Box display={'flex'} gap='3' m={10}>
                <Box {...containerProps} display='flex' flexDirection={'column'} justifyContent='space-between'>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    >
                      Receive Invoice
                  </Box>
                  Icon
                  <Button colorScheme={'orange'} onClick={()=>navigate('/client/receive-invoice')}>Go to Page</Button>
                </Box>
                <Box {...containerProps} display='flex' flexDirection={'column'} justifyContent='space-between'>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    >
                      Invoices
                  </Box>
                  Icon
                  <Button colorScheme={'orange'} onClick={()=>navigate('/client/invoices')}>Go to Page</Button>
                </Box>
            </Box>
            
            )
        }
        else {
          return (<Box display={'flex'} gap='3' m={10}>
                <Box {...containerProps} display='flex' flexDirection={'column'} justifyContent='space-between'>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    >
                      New Clients
                  </Box>
                  Icon
                  <Button colorScheme={'orange'} onClick={()=>navigate('/admin/new-clients')}>Go to Page</Button>
                </Box>
                <Box {...containerProps} display='flex' flexDirection={'column'} justifyContent='space-between'>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    >
                      Client List
                  </Box>
                  Icon
                  <Button colorScheme={'orange'} onClick={()=>navigate('/admin/clients')}>Go to Page</Button>
                </Box>
            </Box>)
        }
    }

    // return <Navigate to={`/${newToken.user_info.user_type}`}/>
    // // if(user.has_access){
    // //   const newToken = jwtDecode(token)
    // //   return <Navigate to={`/${newToken.user_info.user_type}`}/> 
    // // }
    // // else {
    // //   return <Navigate to={`/404`}/>
    // // }
  }

  return (
    <div>404</div>
  )
}

export default Content
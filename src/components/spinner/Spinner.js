import React from 'react';
import {
    Spinner as ChakraSpinner,
    Box
} from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Box bgColor={'white'} height='inherit' width='100%' display={'flex'} alignItems='center' justifyContent={'center'}>
        <ChakraSpinner size='md' text='Loading'/>
    </Box>
  )
}

export default Spinner
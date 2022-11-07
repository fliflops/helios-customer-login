import React from 'react'
import {
    Box,
    Text,
    Input
} from '@chakra-ui/react';

const DateInput = ({
    label,
    value,
    onChange,
    name
}) => {
  return (
    <Box display={'flex'} flexDirection='column' rowGap={1} width='100%'>
        <Text fontWeight={'semibold'} fontSize='md'>{label}</Text>
        <Input size={'sm'} type={'date'} value={value || ''} onChange={onChange} name={name}/>
    </Box>
  )
}

export default DateInput

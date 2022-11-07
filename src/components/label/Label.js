import React from 'react';
import {
  Flex,
  Text
} from '@chakra-ui/react';

const Label = ({
  label,
  value
}) => {
  return (
    <Flex direction={'column'}>
      <Text fontWeight={'semibold'} fontSize='md'>{label}</Text>
      <Text fontWeight={'light'} fontSize='sm'>{value}</Text>
    </Flex>
  )
}

Label.defaultProps = {
  label:'',
  value:''
}
export default Label

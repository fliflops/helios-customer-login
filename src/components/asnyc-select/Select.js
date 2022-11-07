import React from 'react';
import AsyncSelect from 'react-select/async';
import {
  Text,
  Box
} from '@chakra-ui/react';

import {useGetSelectDataQuery} from '../../redux/api/select.api.slice';

const Select = ({
  route,
  query,
  onChange,
  label,
  value,
  name,
}) => {
    const {data = [],isLoading,isSuccess} = useGetSelectDataQuery({route,query})

    const setSelected = (inputValue) => {
        return data.data.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
    }

    return (
        <Box display={'flex'} flexDirection='column' gap='2' minW={'100%'} maxW='100%'>
          <Text fontWeight={'semibold'} fontSize='md'>{label}</Text>
          <AsyncSelect 
              isLoading={isLoading}
              isClearable
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={document.body}
              placeholder={label}
              value={value}
              onChange={e => onChange(e,name)}
              defaultOptions={isSuccess ? data.data.slice(0,20) : []}
              loadOptions={(inputValue,callBack) => {
                setTimeout(() => {
                    callBack(setSelected(inputValue))
                },500)
              }}
          />
        </Box>
    )
}

export default Select
import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,

} from '@chakra-ui/react';

const Simple = ({
    data,
    columns
}) => {

    React.useEffect(()=>{
        console.log(data)
    },[data])
  return (
    <TableContainer width={'100%'}>
        <Table variant={'simple'} borderWidth='1px' size={'sm'}>
            <Thead>
                <Tr>
                    {columns.map((column,index) => (
                        <Th key={index}>{column}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((row)=> (
                    <Tr key={row.id}>
                        {row.data.map((td,index) => (
                            <Td fontSize={'xs'} key={index}>{typeof td !== 'string' ? td(row.id,data) : td}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default Simple
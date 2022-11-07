import React from 'react';
import {
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Table,
    Box,
    Button,
    Text,
    Select,
    Input,
} from '@chakra-ui/react';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,

} from "@tanstack/react-table";
import {setSelectedRows,} from '../../../redux/slice/table.slice';
import { useDispatch } from 'react-redux';

const pageSizes = [
    5,
    10,
    20,
    50,
    100
]


const AutoPaginated = ({
    columns,
    data
}) => {
    const [rowSelection,setRowSelection] = React.useState({})
    const dispatch = useDispatch();
    //const rowSelection = useSelector(selectRowSelection)
    const table = useReactTable({
        columns,
        data:data,
        state:{
            rowSelection
        },
        defaultColumn:{
            size: 150,
            minSize: 20,
        },
        enableColumnResizing:true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        
    })

    React.useEffect(() => {
        const selectedRows = table.getSelectedRowModel().flatRows.map(item => {
            return item.original
        })
        
        dispatch(setSelectedRows( selectedRows))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[rowSelection])

    return (
    <Box borderWidth={'1px'} rounded='sm'>
        <Box display={'flex'} justifyContent='space-between' p='1'>
            <Text fontSize={'small'} fontWeight='bold'>Data </Text>
            <Text fontSize={'small'} fontWeight='bold'>Count: {data?.length || 0}</Text>
        </Box>
        <TableContainer borderTop={'inherit'}>
            <Table variant='simple' size='sm'>
            <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header=> (
                                    <Th key={header.id}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </Th>
                                ))
                            }
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Td key={cell.id} fontSize='small'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <Box display={{lg:'flex'}} justifyContent={{lg:'space-between'}} p='1' alignItems={'center'}>
            <Button width={{xl:'xs',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.previousPage()}} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Box display={'flex'} columnGap='2' p={2} justifyContent='center'>
                <Text fontSize={'sm'}>Page</Text>
                <Input 
                    type='number' 
                    width={'10'} 
                    size='xs' 
                    //defaultValue={table.getState().pagination.pageIndex + 1} 
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e)=>{
                        const page = e.target.value ?   Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}/>
                <Text fontSize='sm'>of {table.getPageCount()}</Text>
                <Select 
                    width={'30'} 
                    size='xs' 
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size} rows</option>
                    ))}
                </Select>
            </Box>
            <Button width={{xl:'xs',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.nextPage()}} disabled={!table.getCanNextPage()}>Next</Button>
        </Box>
    </Box>
  )
}

export default AutoPaginated
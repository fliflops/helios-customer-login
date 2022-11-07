import React from 'react';
import { Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button,
    Text,
    Select,
    Input
} from "@chakra-ui/react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel
} from "@tanstack/react-table";
import {useGetClientsQuery} from '../../../redux/api/pagination.api.slice';
const pageSizes = [
    5,
    10,
    20,
    50,
    100
]

const DataTable = ({columns,route,customFilters}) => {
    const [page,setPage] = React.useState({
        pageSize:10,
        pageIndex:0
    });

    const {data = []} = useGetClientsQuery({
        route:route,
        query:{
            ...page,
            ...customFilters
        }
    })

    const table = useReactTable({
        columns,
        data:data?.rows || [],
        manualPagination:true,
        pageCount: data?.pageCount,    
        state:{
            pagination:{
                ...page
            }
        },
        onPaginationChange:setPage,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
    <Box borderWidth={'1px'} rounded='sm'>
        <Box display={'flex'} justifyContent='space-between' p='1'>
            <Text fontSize={'small'} fontWeight='bold'>Data </Text>
            <Text fontSize={'small'} fontWeight='bold'>Count: {data?.count || 0}</Text>
        </Box>
        <TableContainer borderTop={'inherit'} >
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
            <Button width={{xl:'md',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.previousPage()}} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Box display={'flex'} columnGap='2' p={2} justifyContent='center'>
                <Text fontSize={'md'}>Page</Text>
                <Input 
                    type='number' 
                    width={'10'} 
                    size='sm' 
                    defaultValue={table.getState().pagination.pageIndex + 1} 
                    onChange={(e)=>{
                        const page = e.target.value ?   Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}/>
                <Text>of {table.getPageCount()}</Text>
                <Select 
                    width={'30'} 
                    size='sm' 
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
            <Button width={{xl:'md',lg:'sm', sm:'100%'}} fontSize={'sm'} fontWeight='normal' onClick={()=>{table.nextPage()}} disabled={!table.getCanNextPage()}>Next</Button>
        </Box>
    </Box>
    )
}

export default DataTable
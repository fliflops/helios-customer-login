import React from 'react';
import { 
    Box,
    Text,
    WrapItem
} from '@chakra-ui/react';
import {CheckIcon,CloseIcon} from '@chakra-ui/icons';

import {Table} from '../../../components/datatable';
import {createColumnHelper} from '@tanstack/react-table';

const containerProps = {
    p:5,
    m:5,
    maxWidth:'100%',
    bg:'white',
    shadow:'sm',
    rounded:'md' 
}

const ClientList = () => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('first_name',{
            header:'First Name'
        }),
        columnHelper.accessor('last_name',{
            header:'Last Name'
        }),
        columnHelper.accessor('user_status',{
            header:'Status'
        }),
        columnHelper.accessor('email',{
            header:'Email'
        }),
        columnHelper.accessor('store_name',{
            header:'Store Name & Branch'
        }),
        columnHelper.accessor('brand_name',{
            header:'Consignee Brand Name'
        }),
        columnHelper.accessor('legal_name',{
            header:'Legal Entity Name'
        }),
        columnHelper.accessor('createdAt',{
            header:'First Name'
        }),
        columnHelper.accessor('is_approved',{
            header:'Approved',
            cell: props => {
                const data = props.getValue()
                return <Box display={'flex'} justifyContent='center'>
                    {
                        data === 1 
                        ? <WrapItem p='2' rounded={'2xl'} bgColor='green' color='white'><CheckIcon/></WrapItem> 
                        : <WrapItem p='2' rounded={'2xl'} bgColor='red.600' color='white'><CloseIcon/></WrapItem>
                    }
                </Box>
            }
            
        }),
        columnHelper.accessor('is_verified',{
            header:'Verified',
            cell: props => {
                const data = props.getValue()
                return <Box display={'flex'} justifyContent='center'>
                    {
                        data === 1
                        ? <WrapItem p='2' rounded={'2xl'} bgColor='green' color='white'><CheckIcon/></WrapItem> 
                        : <WrapItem p='2' rounded={'2xl'} bgColor='red.600' color='white'><CloseIcon/></WrapItem>
                    }
                </Box>
            }
        }),
    ]

    return (
        <Box {...containerProps}>
            <Box mb='2'>
                <Text fontSize={'xl'} fontWeight='semibold'>Client List</Text>
            </Box>
            <Box>
                <Table
                    columns={columns}
                    route={'/user/clients'}
                />
            </Box>
        </Box>
    )
}

export default ClientList
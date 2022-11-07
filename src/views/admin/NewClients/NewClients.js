import React from 'react';
import { Box,Text,WrapItem,Button,useDisclosure} from '@chakra-ui/react';
import {CheckIcon,CloseIcon} from '@chakra-ui/icons';

import {Table} from '../../../components/datatable';
import {createColumnHelper} from '@tanstack/react-table';

import ApproveDialog from './ApproveDialog';

import {ApproveDialogContext} from '../../../utils/context';

const containerProps = {
    p:5,
    m:5,
    maxWidth:'100%',
    bg:'white',
    shadow:'sm',
    rounded:'md' 
}

const NewClients = () => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const columnHelper = createColumnHelper();
    const [client,setClient] = React.useState({});
    const columns = [
        columnHelper.accessor('email',{
            header:'Email',
            cell: props => {
                const value = props.getValue();
                const row = props.row.original;
                return <Button 
                    onClick={()=> {
                        setClient({
                            ...row
                        })
                        onOpen()
                    }}
                    variant={'link'} 
                    size='sm'>
                        {value}
                </Button>
            }
        }),
        columnHelper.accessor('first_name',{
            header:'First Name'
        }),
        columnHelper.accessor('last_name',{
            header:'Last Name'
        }),
        columnHelper.accessor('user_status',{
            header:'Status'
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
            header:'Date Registered'
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
        })        
    ]

    return (    
        <Box {...containerProps}>
            <Box mb='2'>
                <Text fontSize={'xl'} fontWeight='semibold'>New Clients</Text>
            </Box>
            <Box>
                <Table
                    columns={columns}
                    route={'/user/clients'}
                    customFilters={{
                        is_approved:'0',
                        user_type:'client',
                        user_status:'ACTIVE'
                    }}
                />
            </Box>
            <ApproveDialogContext.Provider value={client}>
                <ApproveDialog isOpen={isOpen} onClose={onClose}/>
            </ApproveDialogContext.Provider>
        </Box>
    )
}

export default NewClients
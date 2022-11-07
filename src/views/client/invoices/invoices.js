import React from 'react';
import {Box,Text} from '@chakra-ui/react';
import {Table} from '../../../components/datatable';
import {createColumnHelper} from '@tanstack/react-table'

const containerProps = {
    p:3,
    maxWidth:'100%',
    bg:'white',
    shadow:'sm',
    rounded:'md' 
}
  
const Invoices = () => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('invoice_no',{
          header:'Invoice No'
        }),
        columnHelper.accessor('rdd',{
          header:'Delivery Date'
        }),
        columnHelper.accessor('stc_code',{
          header:'STC Code'
        }),
        columnHelper.accessor('principal_code',{
          header:'Principal Code'
        })
      ]
    return (
        <Box {...containerProps } display={'flex'} gap='2' flexDirection={'column'} m='5'>
            <Text>Invoice List</Text>
            <Table
                columns={columns}
                route='/invoice'
            />
        </Box>
    )
}

export default Invoices
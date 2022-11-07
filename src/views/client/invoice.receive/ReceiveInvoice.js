import React from 'react';
import {
  Box,
  Checkbox,
  Stack,
  Button,
  Text,
} from '@chakra-ui/react';
import {DateInput} from '../../../components/input';
import {AutoTable,Table} from '../../../components/datatable';
import {AsyncSelect} from '../../../components';
import {useGetHeliosInvoiceQuery,useReceiveInvoiceMutation} from '../../../redux/api/invoice.api.slice';
import {selectRowSelection} from '../../../redux/slice/table.slice';

import {createColumnHelper} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import useToast from '../../../components/toast/toast';


const containerProps = {
  p:3,
  maxWidth:'100%',
  bg:'white',
  shadow:'sm',
  rounded:'md' 
}

const ReceiveInvoice = () => {
  const selectedRows = useSelector(selectRowSelection)
  const [toast] = useToast();
  const [filters,setFilters] = React.useState({
    principal:null,
    rdd:null
  })
  const {data=[],isLoading,refetch} = useGetHeliosInvoiceQuery({
      rdd:filters.rdd,
      principal:filters.principal?.value || null
  })

  const [receiveInvoice,receiveInvoiceOptions] = useReceiveInvoiceMutation()
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('select',{
      size:1,
      header:({table}) => (
        <Box>
          <Checkbox {...{
          isChecked:table.getIsAllRowsSelected(),
          isIndeterminate:table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
        />
        </Box>
        
      ),
      cell: ({row}) => (
        <Box width={'2'}>
          <Checkbox {...{
            isChecked:row.getIsSelected(),
            isIndeterminate:row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler()
          }}
          />
        </Box>
        
      ),
      
    }),
    columnHelper.accessor('invoiceNo',{
      header:'Invoice No'
    }),
    columnHelper.accessor('deliveryDate',{
      header:'Delivery Date'
    })
  ]

  const invoiceColumns = [
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

  const handleSelectChange = (e) => {
    setFilters({
      ...filters,
      principal:e
    })
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:e.target.value
    })
  }

  const handleReceive = async () => {
    if(selectedRows.length === 0) {
      toast({
        title:'No Selected Rows!',
        status:'error'
      })
    }
    
    await receiveInvoice({
      body:{
        invoices:selectedRows.map(item => {
          return {
            invoice_no:item.invoiceNo,
            rdd:item.deliveryDate,
            stc_code:item.shipToCode,
            principal_code:item.customerCode,
            location_code:item.locationCode
          }
        })
      }
    })
    .unwrap()
    .then(result => {
      toast({
        title:'Invoices Received!',
        status:'success'
      })
    })
    .catch(e => {
      toast({
        title:'Error',
        description:e.data.message,
        status:'error'
      })
    })

    console.log(selectedRows)

  }

  React.useEffect(() => {
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filters])

  return (
    <Stack direction={'row'} m={5}>       
      <Box {...containerProps } width='30%' display={'flex'} gap='2' flexDirection={'column'}>
          <Text>Available Invoices</Text>
          <DateInput label={'Delivery Date'} name='rdd' value={filters.rdd} onChange={handleChange}/>
          <AsyncSelect  route={'principal-user'} label='Principal' name='principal' value={filters.principal} onChange={handleSelectChange}/>
          <AutoTable 
            columns={columns}
            data={data?.data || []}
          />
          <Button colorScheme={'orange'} onClick={handleReceive} isLoading={receiveInvoiceOptions.isLoading}>Receive</Button>
      </Box>
      <Box {...containerProps} width='70%' display={'flex'} gap='2' flexDirection={'column'}>
        <Text>Received Invoices</Text>
        <Table
          route={'invoice'}
          columns={invoiceColumns}
          customFilters={{
            rdd:filters.rdd,
            principal_code:filters.principal?.value
          }}
        />
      </Box>
    </Stack>
      )
}

export default ReceiveInvoice
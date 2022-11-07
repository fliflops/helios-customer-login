import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Text,
    Box,
} from '@chakra-ui/react';

import* as Yup from 'yup';
import {ApproveDialogContext} from '../../../utils/context';
import {Label,AsyncSelect} from '../../../components';
import {SimpleTable} from '../../../components/datatable';
import useToast from '../../../components/toast/toast';

import {useApproveUserMutation} from '../../../redux/api/user.api.slice';
import Spinner from '../../../components/spinner/Spinner';

const schema = Yup.object().shape({
    ship_point:Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
    }).nullable().required('Ship Point is Required'),
    consignee:Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
    }).nullable().required('Consignee is Required'),
})

const ApproveDialog = ({
    isOpen,
    onClose
}) => {
    const client = React.useContext(ApproveDialogContext);
    const [toast] = useToast();
    const [approveUser,{isLoading,isSuccess}] =useApproveUserMutation()
    
    const [state,setState] = React.useState({
        ship_point:null,
        consignee:null,
        principal:null
    })

    const [principals,setPrincipals] = React.useState([])

    const handleSelectChange = (selected,name) => {
        setState({
            ...state,
            [name]:selected
        })
    }

    const handleAddPrincipal = () => {
        let temp = principals;
        const isExist = principals.find(value => value.id === state.principal.value)
        if(!isExist && state.principal) {
            setPrincipals(temp.concat([
                {
                    id:state.principal.value,
                    data:[
                        state.principal.value,
                        state.principal.label,
                        (id,data)=>(<Button size={'sm'} colorScheme='red' onClick={()=>{
                            setPrincipals(data.filter(row => row.id !== id))
                        }}>
                            DELETE
                        </Button>)
                    ]
                }
            ]))

            setState({
                ...state,
                principal:null
            })
        }
 
    }

    const handleApprove = async () => {
        //validation
        await schema.validate({
            ship_point:state.ship_point,
            consignee: state.consignee
        })
        .catch(e => {
            return  toast({
                title:'Validation Error',
                description:e.errors.join(','),
                status:'error'
            })
        })  

        if(principals.length === 0){
            return  toast({
                title:'Validation Error',
                description:'Principals are required!',
                status:'error'
            })
        }

        await approveUser({
            id:client.id,
            body:{
                stc_code:       state.ship_point.value,
                stc_name:       state.ship_point.label,
                consignee_code: state.consignee.value,
                consignee_name: state.consignee.label,
                principals:     principals.map(item => {
                    return {
                        principal_code:item.id,
                        principal_name:item.data[1],
                        user_id:client.id
                    }
                })
            }
        })
        .unwrap()
        .then(result => {
            onClose();
            return toast({  
                title:'Success',
                description:'Client Approved!',
                status:'success'
            })
        })
        .catch(e => {
            return toast({
                title:'Error',
                description:e.data.message,
                status:'error'
            })
        })
    }

    const handleDecline = async () => {
        await approveUser({
            id:client.id,
            body:{
                user_status:'DECLINED'
            }
        })
        .unwrap()
        .then(result => {
            
            onClose()
            return toast({  
                title:'Success',
                description:'Client Declined',
                status:'warning'
            })
        })
        .catch(e => {
            return toast({
                title:'Error',
                description:e.data.message,
                status:'error'
            })
        })
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay/>
            <ModalContent maxW={'56rem'}>  
                <ModalHeader>Approve Client</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    { isLoading ? <Spinner/> : <>
                    <Text fontWeight={'semibold'} size='lg'>Client Information</Text>
                    <HStack p={2}>    
                        <VStack align={'flex-start'} width='50%' spacing={2}>
                            <Label label={'Full Name'} value={`${client?.first_name} ${client?.last_name}`}/>
                            <Label label={'Store and Branch Name'} value={client?.store_name}/>
                            <Label label={'Consignee Brand Name'} value={client?.brand_name}/>
                        </VStack>
                        <VStack align={'flex-start'} width='50%'  spacing={2}>
                            <Label label={'Email Address'} value={client?.email}/>
                            <Label label={'Email Verified'} value={client?.is_verified === 1 ? 'Yes' : 'No'}/>
                            <Label label={'Legal Entity Name'} value={client?.legal_name}/>
                        </VStack>
                    </HStack>
                    <Text fontWeight={'semibold'} size='lg'>Store Information</Text>
                    <HStack>
                        <VStack width={'100%'}>
                            <AsyncSelect label={'Store'} name='ship_point' route={'ship-points'} value={state.ship_point} onChange={handleSelectChange}/>
                            <AsyncSelect label={'Consignee'} name='consignee' route={'consignee'} value={state.consignee} onChange={handleSelectChange}/>
                            <Box display={'flex'} columnGap='2' width={'100%'} >
                                <Box width={'80%'}>
                                 <AsyncSelect label={'Principal'} name='principal' route={'principals'} value={state.principal} onChange={handleSelectChange}/>
                                </Box>
                                <Button alignSelf={'flex-end'} colorScheme={'teal'} size='sm' onClick={handleAddPrincipal} width='20%'>Add</Button>
                            </Box>
                            <SimpleTable
                                columns={['Principal Code','Principal Name','Actions']}
                                data={principals}
                            /> 
                        
                        </VStack>
                    </HStack>
                    </>
                    }
                </ModalBody>
                <ModalFooter justifyContent={'space-between'}>
                    <Button colorScheme={'red'}  size='sm' onClick={handleDecline}>Decline</Button>
                    <Button colorScheme={'teal'} size='sm' onClick={handleApprove}>Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ApproveDialog
import React from 'react';
import QrPlugin from './QRCodePlugin';
import {Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    // ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    ModalFooter,
    // HStack,
    // Text,
    // Box,
} from '@chakra-ui/react';
import {useQrMutation,useLogoutMutation} from '../../../redux/api/auth.api.slice'
import {selectCurrentToken} from '../../../redux/slice/auth.slice';
import {setQr,logOut} from '../../../redux/slice/auth.slice';
import {useDispatch,useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import useToast from '../../../components/toast/toast';
import Spinner from '../../../components/spinner';
import { useNavigate } from 'react-router-dom';
const Qr = ({
    isOpen,
    onClose
}) => {
    const navigate = useNavigate();
    const [authQr,{isLoading}] = useQrMutation();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);
    const [toast] = useToast()

    const decodeQrCode =async (decodedValue) => {
        const newToken = jwtDecode(token)

        await authQr({
            email:newToken.user_info.email,
            qr_key:decodedValue
        })
        .unwrap()
        .then(result => {
            dispatch(setQr())
            navigate('/')
            
        })
        .catch(e => {
            dispatch(logOut())
            logout({
                email:newToken.user_info.email
            }).unwrap()
            toast({
                title:'Error',
                description:e.message,
                status:'error'
            })
        })
    }
    
    const handleCancel = async () => {
        const newToken = jwtDecode(token)
        dispatch(logOut())
        await logout({
            email:newToken.user_info.email
        }).unwrap()
        onClose();
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>QR Authentication</ModalHeader>
                <ModalBody>
                    <VStack>
                        {isLoading ? <Spinner/> : null}
                        <QrPlugin
                            isStart ={isOpen}
                            qrCodeSuccessCallback={decodeQrCode}
                        />
                    </VStack>   
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme={'red'} onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Qr
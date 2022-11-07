import React from 'react';
import {
    Box,
    Image,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    VStack,
    Text,
    Link,
    Flex,
    useDisclosure
} from '@chakra-ui/react';


import {Field,Formik} from 'formik';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { useDispatch,useSelector} from 'react-redux';

import useToast from '../../../components/toast';
import {useLoginMutation} from '../../../redux/api/auth.api.slice';
import {setCredentials,selectCurrentToken,logOut,setQr, selectCurrentUser} from '../../../redux/slice/auth.slice';

import QrDialog from '../qr';

import bg from '../../../assets/img/kli_bg.png'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);

    const [login,{isLoading}] = useLoginMutation();
    const [logout] = useLoginMutation();
    const [toast] = useToast();
    const {onClose,onOpen,isOpen} = useDisclosure()


    const handleSubmit = async (values) => {
        try{
            const user = await login({
                email: values.email,
                password: values.password
            }).unwrap()

            dispatch(setCredentials({
                ...user,
                // has_qr:false
            }))

            const newToken = jwtDecode(user.token)

            if(newToken.user_info.user_type === 'admin') {
                dispatch(setQr())
                navigate('/')
            }
            else {
                  
                if(newToken.user_info.is_approved === 1 && newToken.user_info.is_verified === 1 && newToken.user_info.user_status === 'ACTIVE'){
                    //additional authentication for clients 
                    //qr authentication
                    onOpen()
                }
                else{
                    await logout({
                        email:newToken.user_info.email
                    }).unwrap()
                    dispatch(logOut())
                    toast({
                       title:'Something wrong!',
                       status:'error' 
                    })
                }
            }
        }
        catch(e){
            console.log(e)
            toast({
                title:e.data.message,
                status:'error'
            })
        }
    }
    
    if(token && user.has_qr){
        return <Navigate to='/'/>
    }

    return (
        <Box>
            <Image
                height={{
                    base:'100vh'
                }}
                objectFit={'cover'}
                src={bg}
                alt='LI Background'
            /> 
            <Box 
                boxShadow='dark-lg'
                position={'absolute'} 
                top='0' 
                right={'0'}
                width={{
                   base:'xl',
                   xl:'xl',
                   md:'100%', 
                   sm:'100%'
                }}
                height={{
                    base:'100vh' 
                }}
                bg={'#2C2C2C'}
                color={'gray.200'}
                display='flex'
                justifyContent={'center'}
            >       
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, errors, touched,isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={4} width={{base:'lg',md:'md',sm:'280px'}} pt={{base:'32'}}>
                                    <Text fontSize={'4xl'}>Sign In</Text>
                                    <FormControl>
                                        <FormLabel htmlFor="email">Email Address</FormLabel>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder='Email'
                                            />
                                    </FormControl>
                                    <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        validate={(value) => {
                                        let error;

                                        if (value.length < 5) {
                                            error = "Password must contain at least 6 characters";
                                        }

                                        return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <Button type="submit" colorScheme={'orange'} width="full" isLoading={isLoading} loadingText={'Logging In'}>
                                        Login
                                    </Button>
                                    <Flex direction={'row'} width='100%'>
                                        <Link as={RouterLink} to='/register' color={'whiteAlpha.600'} fontSize='sm' flex='1'>Register</Link>
                                        <Link color={'whiteAlpha.600'} fontSize='sm' onClick={onOpen}>Forgot Password</Link>
                                    </Flex>

                                </VStack>
                            </form>
                        )}

                    </Formik>

                </Box>
                <QrDialog onClose={onClose} isOpen={isOpen}/>
        </Box>
    )
}

export default Login
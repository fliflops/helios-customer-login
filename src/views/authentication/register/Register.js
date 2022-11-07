import React from 'react';
import {
    FormControl,
    Input,
    FormLabel,
    VStack,
    Box,
    Text,
    Button,
    FormErrorMessage
} from '@chakra-ui/react';
import {Field,Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

// import Spinner from '../../../components/spinner';
import useToast from '../../../components/toast';
import {useRegisterMutation} from '../../../redux/api/user.api.slice';

const RegisterSchema = Yup.object().shape({
    first_name:Yup.string().required('Required'),
    last_name:Yup.string().required('Required'),
    email:Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string()
        .min(6,'Password length must be greater than 6 characters')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'),null],'Password not match')
        .required('Required'),
    store_name:Yup.string().required('Required'),
    brand_name:Yup.string().required('Required'),
    legal_name:Yup.string().required('Required')
})

const Register = () => {
    const [toast] = useToast()
    const [register,{isLoading}] = useRegisterMutation()
    const navigate = useNavigate();
    
    const initialValues = {
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirmPassword:'',
        store_name:'',
        brand_name:'',
        legal_name:''
    }

    const onSubmit = async(values,{resetForm}) => {
        await register(values)
        .unwrap()
        .then(payload => {
            toast({
                title: payload.message.title,
                description:payload.message.description,
                status:payload.message.status
            })

            resetForm({...initialValues})
            navigate('/login')
        })
        .catch(e => {
            console.log(e.data.message)
            toast({
                title: e.data.message,
                status:'error'
            })
        })
    }

    return (
        <Box>
          <Box width={'100%'}  p='5' bg='white' shadow={'md'} justifyContent='space-between' display={'flex'}>
            <Text fontSize={'2xl'}>Registration</Text>
            <Button variant={'link'} onClick={()=>{navigate('/login')}}>Back to Login</Button>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={RegisterSchema}
          >
            {({handleSubmit, errors, touched,isSubmitting})=>(
                <form onSubmit={handleSubmit}>
                  <Box bg={'white'} display={{md:'flex'}} mt={{sm:10}} ml={{sm:10,md:32}} mr={{sm:10,md:32}} mb={{sm:10}} p={['10','5']} rounded='sm' shadow={'md'}>
                  <VStack  spacing={5} width={{sm:'100%',md:'100%',lg:'50%',xl:'50%'}} pl={5} pr={5}>
                    <FormControl isInvalid={!!errors.first_name && touched.first_name}>
                      <FormLabel htmlFor="first_name">First Name</FormLabel>
                          <Field
                              as={Input}
                              id="first_name"
                              name="first_name"
                              placeholder='First Name'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.first_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.last_name && touched.last_name}>
                          <FormLabel htmlFor="last_name">Last Name</FormLabel>
                          <Field
                              as={Input}
                              id="last_name"
                              name="last_name"
                              placeholder='Last Name'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.last_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.email && touched.email}>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Field
                              as={Input}
                              id="email"
                              name="email"
                              placeholder='Email'
                              type='Email'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.password && touched.password}>
                            <FormLabel htmlFor='Password'>Password</FormLabel>
                            <Field
                              as={Input}
                              id="password"
                              name="password"
                              placeholder='Password'
                              type='password'
                            />
                            <FormErrorMessage fontSize={'small'}>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                            <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                            <Field
                              as={Input}
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder='Confirm Password'
                              type='password'
                            />
                            <FormErrorMessage fontSize={'small'}>{errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                      
                  </VStack>
                  <br/>
                  <VStack width={{xl:'50%',lg:'50%',md:'100%',sm:'100%'}} spacing={5} pl={5} pr={5}> 
                  <FormControl isInvalid={!!errors.store_name && touched.store_name}>
                      <FormLabel htmlFor="store_name">Store Name & Branch</FormLabel>
                          <Field
                              as={Input}
                              id="store_name"
                              name="store_name"
                              placeholder='Store Name (e.g. SM Hypermart Sucat)'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.store_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.brand_name && touched.brand_name}>
                          <FormLabel htmlFor="brand_name" >Store & Consignee Brand Name</FormLabel>
                          <Field
                              as={Input}
                              id="brand_name"
                              name="brand_name"
                              placeholder='Store & Consignee Brand Name (e.g. SM Hypermart, SM Savemore)'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.brand_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!errors.legal_name && touched.legal_name}>
                          <FormLabel htmlFor="legal_name">Legal Entity Name</FormLabel>
                          <Field
                              as={Input}
                              id="legal_name"
                              name="legal_name"
                              placeholder='Legal Entity Name'
                          />
                          <FormErrorMessage fontSize={'small'}>{errors.legal_name}</FormErrorMessage>
                      </FormControl>
                      <Box width={'100%'}>
                        <Button type='submit' float='right'  colorScheme='orange' width={{xl:'auto',md:'auto',sm:'full'}} isLoading={isLoading} loadingText='Submitting'>Submit</Button>                
                      </Box>
                  </VStack> 
                  
                  </Box>
                  
                </form>
            )}
          </Formik>
          </Box>
    )
}

export default Register
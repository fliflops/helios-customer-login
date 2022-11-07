import React from 'react';
import {
    Box,
    Flex,
    // Avatar,
    HStack,
    // Link,
    // IconButton,
    // Button,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    // MenuDivider,
    // useDisclosure,
    useColorModeValue,
    // Stack,
  } from '@chakra-ui/react';
//   import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
  import {useSelector,useDispatch} from 'react-redux';
  import jwt_decode from 'jwt-decode';
  import {useNavigate} from 'react-router-dom';

  import {selectCurrentToken} from '../redux/slice/auth.slice';
  import {useLogoutMutation} from '../redux/api/auth.api.slice';
  import {logOut} from '../redux/slice/auth.slice';
  

const Header = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = jwt_decode(useSelector(selectCurrentToken));
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        await logout({
            email:currentUser.user_info.email
        }).unwrap()
        
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.900')} px={4} shadow={'md'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    {/* <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    /> */}
                    <HStack  spacing={8} alignItems='center'>
                        <Box>Kerry Logistikus</Box>
                    </HStack>
                        <Menu>
                            <MenuButton 
                                // as={Button}
                                // variant={'Link'}
                                cursor={'pointer'}>
                                <Flex flexDir={'column'} alignItems='flex-end'>
                                    <Box><Text fontSize={'md'}>{currentUser.user_info.first_name}</Text></Box>
                                    <Box><Text fontSize={'xs'} display={{md:'block',sm:'none'}}>{currentUser.user_info.email} | {currentUser.user_info.user_type}</Text></Box>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                                <MenuItem>Update Account</MenuItem>
                            </MenuList>
                        </Menu>
                </Flex>
            </Box>
        </>
    )
}

export default Header
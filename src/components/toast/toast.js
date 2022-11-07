import {useToast as useChakraToast} from '@chakra-ui/react';

const useToast = () => {
    const toast = useChakraToast()

    return [({title,description,status}) => {
        return toast({
            title,
            description,
            status,
            position:'top-right',
            duration: 9000,
            isClosable: true,

        })
    }]
}

export default useToast



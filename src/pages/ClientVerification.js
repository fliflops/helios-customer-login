import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {useConfirmEmailMutation} from '../redux/api/user.api.slice';


const ClientVerification = () => {
    const [searchParams] = useSearchParams();
    const [confirm,{isSuccess,isError}] = useConfirmEmailMutation()
    const token = searchParams.get('token')



    React.useEffect(() => {
        const emailConfirm =async() => {
            await confirm(token).unwrap()
        }

        if(token) {
            emailConfirm()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const component = () => {
        if(!token){
            return <div>Invalid access</div>
        }
        if(isSuccess) {
            return <div>Email Verified!</div>
        }
        if(isError){
            return <div>Error!</div>
        }

        return <div>No Access</div>
    }

    return component() 
}

export default ClientVerification
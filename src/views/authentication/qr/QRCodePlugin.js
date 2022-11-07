import React from 'react'
import { Html5Qrcode } from "html5-qrcode";
import {Box} from '@chakra-ui/react';

let html5QrCode;

const QRCodePlugin = ({
    isStart,
    qrCodeSuccessCallback
}) => {
    React.useEffect(()=>{
        html5QrCode = new Html5Qrcode('reader');
    },[])

    React.useEffect(() => {
        if(isStart === true) {
            console.log('start cameara')
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps:'10',qrbox: { width: 250, height: 250 }
                },
                (docodedText,decodedResult)=>{
                    console.log(docodedText)
                    qrCodeSuccessCallback(docodedText)
                })
        }

        return () => {
            console.log('close camera')
            html5QrCode
            .stop()
            .then(res => {
                html5QrCode.clear();
            })
            .catch(e => {
                console.log(e.message)
            }) 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isStart])

    return (
        <div>
            <Box id='reader' width={'sm'}/>
        </div>
    )
}

export default QRCodePlugin

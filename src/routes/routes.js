import {createBrowserRouter} from 'react-router-dom';

import Login from '../views/authentication/login';
import Register from '../views/authentication/register';

import Layout from '../layout';
import Content from '../layout/Content';

import {ClientVerification,NoAccess} from '../pages';
import {Admin} from '../views/admin';
import {ClientList} from '../views/admin/ClientList';
import {NewClients} from '../views/admin/NewClients';

import {Invoices, ReceiveInvoice} from '../views/client/';

import {Client} from '../views/client';


import App from '../App';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
            //public routes
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"confirmation",
                element:<ClientVerification/>
            },
            {
                element:<Layout/>,
                children:[
                    {
                        index:true,
                        element:<Content/>
                    },
                    {   
                        path:'admin/*',
                        element:<Admin/>,
                        children:[
                            {
                                path:'clients',
                                element:<ClientList/>
                            },
                            {   
                                path:'new-clients',
                                element: <NewClients/>
                            }
                        ]
                        
                    },
                    {
                        path:'client/*',
                        element:<Client/>,
                        children:[
                            {
                                path:'receive-invoice',
                                element:<ReceiveInvoice/>
                            },
                            {
                                path:'invoices',
                                element:<Invoices/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path:'*',
        element:<NoAccess/>
    },
])

export default router;
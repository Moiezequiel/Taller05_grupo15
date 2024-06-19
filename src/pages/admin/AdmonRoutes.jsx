import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import AddRol from './AddRol'
import Navbar from '../../component/Navbar'

const AdmonRoutes = () => {

    const adminMenuItems = [
        { label: 'asignar rol usuario', url: '/admon' },
    ];

    return (
        <>
            <Navbar menuItems={adminMenuItems} />

            <Routes>    
                <Route path="/" element={<AddRol/>} />
            </Routes>
        </>
    )
}

export default AdmonRoutes

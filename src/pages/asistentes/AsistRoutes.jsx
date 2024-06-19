import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckAppoinmet from './CheckAppoinmet'
import Navbar from '../../component/Navbar'


const AsistRoutes = () => {
    const adminMenuItems = [
        { label: 'Solicitudes de citas', url: '/asistente' },
    ];
    return (
        <>
            <Navbar menuItems={adminMenuItems} />
            <Routes>
                <Route path="/" element={<CheckAppoinmet/>} />
            </Routes>
        </>
    )
}

export default AsistRoutes

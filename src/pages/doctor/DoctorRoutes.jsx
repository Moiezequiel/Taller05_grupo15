import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddPrescription from './AddPrescription'
import CitasDoctor from './CitasDoctor'
import Navbar from '../../component/Navbar'

const DoctorRoutes = () => {
    const adminMenuItems = [
        { label: 'añadir prescripcion', url: '/doctor/prescription' },
        { label: 'citas agendadas', url: '/doctor' },
    ];
    return (
        <>
            <Navbar menuItems={adminMenuItems} />
            <Routes>
                <Route path="/prescription" element={<AddPrescription/>} />
                <Route path='/' element={<CitasDoctor/>} />
            </Routes>   
        </>
    )
}

export default DoctorRoutes

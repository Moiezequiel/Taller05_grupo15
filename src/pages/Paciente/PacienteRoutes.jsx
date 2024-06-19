import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import MedicalHistoryPage from './MedicalHistoryPage'
import PatientView from './PatienView'
import Navbar from '../../component/Navbar'

const PacienteRoutes = () => {
    const adminMenuItems = [
        { label: 'Home', url: '/patient' },
        { label: 'Historial medico', url: '/patient/history' },
        { label: 'Prescripciones Vigentes', url: '/patient/patien' },
    ];

    return (
        <>
        <Navbar menuItems={adminMenuItems}/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/history" element={<MedicalHistoryPage/>} />
            <Route path="/patien" element={<PatientView/>} />
        </Routes>
        </>
    )
}

export default PacienteRoutes

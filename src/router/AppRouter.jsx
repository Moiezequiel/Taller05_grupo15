import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import AdmonRoutes from '../pages/admin/AdmonRoutes';
import PacienteRoutes from '../pages/Paciente/PacienteRoutes';
import DoctorRoutes from '../pages/doctor/DoctorRoutes';
import AsistRoutes from '../pages/asistentes/AsistRoutes';
import HomePage from '../pages/HomePage';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/admin' element={<AdmonRoutes/>}/>
                <Route path='/patient' element={<PacienteRoutes/>}/>
                <Route path='/doctor' element={<DoctorRoutes/>}/>
                <Route path='/assistant' element={<AsistRoutes/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
/*
<Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute canActivate={token} requiredRole={1} />}>
                        <Route path="/admon/*" element={<AdmonRoutes />} />
                    </Route>
                    <Route element={<ProtectedRoute canActivate={token} requiredRole={2} />}>
                        <Route path="/paciente/*" element={<PacienteRoutes />} />
                    </Route>
                    <Route element={<ProtectedRoute canActivate={token} requiredRole={3} />}>
                        <Route path="/doctor/*" element={<DoctorRoutes />} />
                    </Route>
                    <Route element={<ProtectedRoute canActivate={token} requiredRole={4} />}>
                        <Route path="/asistente/*" element={<AsistRoutes />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>

*/
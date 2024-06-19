import React, { useState, useEffect } from 'react';
import { getScheduleByDoctorAndDate } from '../../services/sheduleService';

const CitasDoctor = () => {
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Obtener el ID del doctor autenticado desde el almacenamiento local
    const loggedInDoctorId = localStorage.getItem('userId'); // Asegúrate de almacenar el ID del doctor en el localStorage al iniciar sesión
    setDoctorId(loggedInDoctorId);
  }, []);
  
  const fetchAppointments = async () => {
    if (doctorId && selectedDate) {
      try {
        const data = await getScheduleByDoctorAndDate(doctorId, selectedDate);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId, selectedDate]);

  const handleSearch = () => {
    fetchAppointments();
  };

  const handleCompleteAppointment = (id) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.appointmentId === id) {
        if (appointment.state === 'confirmed') {
          return { ...appointment, state: 'completed' };
        } else {
          alert("Solo las citas confirmadas pueden ser completadas.");
        }
      }
      return appointment;
    }));
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-black mb-5">Ver Citas Médicas</h1>
        
        <div className="w-full max-w-4xl mt-5">
          {/* Selector de ID del Doctor */}
          {/*<div className="mb-5 flex justify-between w-full">
            <label className="block mb-2 font-medium text-gray-700">
              ID del Doctor:
              <input 
                type="text" 
                value={doctorId} 
                onChange={(e) => setDoctorId(e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>*/}
          {/* Selector de Fecha */}
          <div className="mb-5 flex justify-between w-full">
            <label className="block mb-2 font-medium text-gray-700">
              Seleccionar Fecha:
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <button 
            onClick={handleSearch} 
            className="mb-5 p-2 bg-blue-500 text-white rounded">
            Buscar Citas
          </button>
          
          {/* Lista de Citas para la Fecha Seleccionada */}
          <div className="border border-gray-300 bg-white p-6 rounded-lg mb-5 shadow">
            <h2 className="text-xl font-bold mb-4">Citas para el {selectedDate}</h2>
            <ul className="space-y-4">
              {appointments.map(appointment => (
                <li key={appointment.appointmentId} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                  <p><strong>Paciente:</strong> {appointment.patientName}</p>
                  <p><strong>Historial Médico:</strong> {appointment.history.join(', ')}</p>
                  <p><strong>Doctores Asistentes:</strong> {appointment.doctors.join(', ')}</p>
                  <p><strong>Estado:</strong> {appointment.state}</p>
                  {appointment.state === 'confirmed' && (
                    <button
                      onClick={() => handleCompleteAppointment(appointment.appointmentId)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                    >
                      Completar Cita
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CitasDoctor;

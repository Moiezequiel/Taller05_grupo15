import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar";

const userID = 'e7ae750e-d10f-4169-9de6-9435bc18f804';
const BASE_URL = 'http://localhost:8080/api/appointment'; // Cambia esto a tu URL base de la API


const Home = () => {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [filterState, setFilterState] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [filterState]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/own`, {
        params: {
          id: userID,
          status: filterState || undefined, // Añade el filtro de estado si existe
        },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = response.data;
      console.log('Appointments:', data);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching appointments", error);
      setAppointments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/request`,
        {
          userID,
          reason,
          date,
          state: 'pending',
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
          },
        }
      );
      setAppointments([...appointments, response.data]);
      setReason('');
      setDate('');
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error("Error canceling appointment", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-100 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-black mb-5">Realizar una Cita Médica</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-lg"
        >
          <label className="block mb-4">
            Razón de su cita:
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <label className="block mb-4">
            Día que desea ser atendido:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar Cita
            </button>
            <button
              type="button"
              onClick={() => { setReason(''); setDate(''); }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-5">Citas Realizadas</h2>
        <label className="block mb-4">
          Filtrar por Estado:
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Todos</option>
            <option value="PENDING">Pendiente</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </label>

        <ul className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
          {appointments.map(appointment => (
            <li key={appointment.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span>{appointment.reason} - {appointment.date} ({appointment.status})</span>
                  <div>
                    <span><strong>Usuario:</strong> {appointment.user.name} ({appointment.user.email})</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelAppointment(appointment.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
              {appointment.prescriptions && appointment.prescriptions.length > 0 && (
                <ul className="mt-2">
                  <h3 className="font-bold">Prescripciones:</h3>
                  {appointment.prescriptions.map((prescription, index) => (
                    <li key={index} className="ml-4">
                      {prescription}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;


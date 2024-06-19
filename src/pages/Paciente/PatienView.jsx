import React, { useState, useEffect } from 'react';
import { getPrescriptionsByUser } from '../../services/prescriptionService';

const PatientView = () => {
  const [userId, setUserId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    try {
      const data = await getPrescriptionsByUser(userId);
      setPrescriptions(data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const handleSearch = () => {
    fetchPrescriptions();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-black mb-5">Vista del Paciente</h1>
      
      <div className="w-full max-w-4xl mt-5">
        <div className="mb-5 flex justify-between w-full">
          <label className="block mb-2 font-medium text-gray-700">
            ID del Usuario:
            <input 
              type="text" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <button 
          onClick={handleSearch} 
          className="mb-5 p-2 bg-blue-500 text-white rounded">
          Buscar Prescripciones
        </button>
        <div className="border border-gray-300 bg-white p-6 rounded-lg mb-5 shadow">
          <h2 className="text-xl font-bold mb-4">Prescripciones Vigentes</h2>
          <ul className="space-y-4">
            {prescriptions.map(prescription => (
              <li key={prescription.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                <p><strong>Medicamento:</strong> {prescription.medicine}</p>
                <p><strong>Dosis:</strong> {prescription.dosage}</p>
                <p><strong>Fecha de Finalización:</strong> {new Date(prescription.d_finalization).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientView;

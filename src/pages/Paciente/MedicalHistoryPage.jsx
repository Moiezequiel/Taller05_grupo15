import React, { useState, useEffect } from 'react';
import { getHistoryByUser } from '../../services/historyService';

const MedicalHistoryPage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchHistory = async () => {
    try {
      const data = await getHistoryByUser(userId, startDate, endDate);
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-black mb-5">Historial Médico</h1>
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
          <label className="block mb-2 font-medium text-gray-700">
            Fecha de Inicio:
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2 font-medium text-gray-700">
            Fecha de Fin:
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <button 
          onClick={fetchHistory} 
          className="mb-5 p-2 bg-blue-500 text-white rounded">
          Buscar Historial
        </button>
        <div className="border border-gray-300 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Historial Médico</h2>
          <ul className="space-y-4">
            {history.map(entry => (
              <li key={entry.id} className="p-4 bg-white rounded-lg shadow border border-gray-200">
                <p><strong>Fecha:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                <p><strong>Razón:</strong> {entry.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryPage;

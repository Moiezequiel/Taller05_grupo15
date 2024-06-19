import React, {useState} from 'react'

const AddPrescription = () => {
    const [appointments, setAppointments] = useState([
      { id: 1, reason: 'Consulta General', date: '2024-06-15', doctors: ['Dr. John Doe', 'Dr. Emily Johnson'] }
    ]);
    const [selectedAppointment, setSelectedAppointment] = useState(appointments[0]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [instructions, setInstructions] = useState('');
  
    const handleAddPrescription = (e) => {
      e.preventDefault();
      const newPrescription = {
        id: prescriptions.length + 1,
        medication,
        dosage,
        instructions
      };
      setPrescriptions([...prescriptions, newPrescription]);
      setMedication('');
      setDosage('');
      setInstructions('');
    };
  
    const handleDeletePrescription = (id) => {
      setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
    };
  
    return (
      <>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
          <h1 className="text-3xl font-bold text-black mb-5">Atender Cita Médica</h1>
          {selectedAppointment && (
            <div className="bg-white shadow-lg rounded-lg p-6 mb-10 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Detalles de la Cita</h2>
              <p className="mb-2"><strong>Razón:</strong> {selectedAppointment.reason}</p>
              <p className="mb-2"><strong>Fecha:</strong> {selectedAppointment.date}</p>
              <p className="mb-4"><strong>Doctores:</strong> {selectedAppointment.doctors.join(', ')}</p>
              
              <h2 className="text-xl font-bold mb-4">Prescripciones</h2>
              <form onSubmit={handleAddPrescription} className="flex flex-col items-center mb-6">
                <label className="block mb-4 w-full">
                  Medicamento:
                  <input
                    type="text"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
                <label className="block mb-4 w-full">
                  Dosis:
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
                <label className="block mb-4 w-full">
                  Instrucciones:
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Añadir Prescripción</button>
              </form>
              
              <h3 className="text-lg font-bold mb-2">Prescripciones Actuales</h3>
              <ul className="space-y-4">
                {prescriptions.map(prescription => (
                  <li key={prescription.id} className="bg-white p-4 rounded shadow">
                    <p><strong>Medicamento:</strong> {prescription.medication}</p>
                    <p><strong>Dosis:</strong> {prescription.dosage}</p>
                    <p><strong>Instrucciones:</strong> {prescription.instructions}</p>
                    <button
                      onClick={() => handleDeletePrescription(prescription.id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default AddPrescription;

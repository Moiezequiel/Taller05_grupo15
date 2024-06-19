import React,{useState, useEffect} from 'react'

const AddRol = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', role: 'Paciente' },
    { id: 2, name: 'Bob', role: 'Paciente' },
    { id: 3, name: 'Charlie', role: 'Doctor' },
    { id: 4, name: 'David', role: 'Assistant' }
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setRole(user.role);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSaveRole = () => {
    setUsers(users.map(user => user.id === selectedUser.id ? { ...user, role } : user));
    setSelectedUser(null);
    setRole('');
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-black mb-5">Administrar Roles de Usuarios</h1>
        
        <div className="flex w-full max-w-4xl mt-5">
          {/* Lista de Usuarios */}
          <div className="w-1/2 border-r border-gray-300 p-4">
            <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
            <ul className="space-y-2">
              {users.map(user => (
                <li 
                  key={user.id} 
                  className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-200" 
                  onClick={() => handleUserClick(user)}
                >
                  {user.name} - {user.role}
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario de Asignación de Rol */}
          <div className="w-1/2 p-4">
            {selectedUser && (
              <>
                <h2 className="text-xl font-bold mb-4">Asignar Rol</h2>
                <p className="mb-4"><strong>Usuario:</strong> {selectedUser.name}</p>
                <label className="block mb-4">
                  Rol:
                  <select 
                    value={role} 
                    onChange={handleRoleChange} 
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Paciente">Paciente</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Assistant">Assistant</option>
                  </select>
                </label>
                <button 
                  onClick={handleSaveRole} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar Rol
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRol;
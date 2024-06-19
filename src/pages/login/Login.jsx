import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import { getRole } from "../../services/roleService";
import { jwtDecode } from "jwt-decode";

// Define la URL base de la API
const BASE_URL = 'http://localhost:8080/api/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email: ", formData.email, "password ", formData.password);
    postData();
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          identifier: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Login successful");
        toast.success("Login successful");
        const token  = response.data.data.content;
        
        // Guardar el token y el rol en el contexto de autenticación
        localStorage.setItem('token', token);
        
        const role = await getRole(token);
        localStorage.setItem('role', role);

        const user = jwtDecode(token);

        console.log("User: ", user);
        
      

        // Redireccionar al usuario a la página principal
        navigateBasedOnRole(role);
      } else {
        console.log("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case 'Administrador':
        navigate('/admin');
        break;
      case 'Doctor':
        navigate('/doctor');
        break;
      case 'Paciente':
        navigate('/patient ');
        break;
      case 'Asistente':
        navigate('/assistant');
        break;
      default:
        navigate('/');
        break;
    }
  }

  return (
    <div className="bg-slate-800 flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-white sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="mt-10 text-center text-sm text-gray-500">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Crea tu cuenta aquí
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

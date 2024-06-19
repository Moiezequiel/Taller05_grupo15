import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
    });

    const login = (token, role) => {
        setAuth({
            token,
            role,
            isAuthenticated: true,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth({
            token: null,
            role: null,
            isAuthenticated: false,
        });
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

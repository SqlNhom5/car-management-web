import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Đây là logic đăng nhập đơn giản, bạn có thể thay thế bằng API call thực tế
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            setUser({
                username,
                role: 'admin'
            });
            return 'admin';
        } else if (username === 'client' && password === 'client') {
            setIsAuthenticated(true);
            setUser({
                username,
                role: 'client'
            });
            return 'client';
        }
        return null;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 
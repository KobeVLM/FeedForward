import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock Login Implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    userId: '123e4567-e89b-12d3-a456-426614174000',
                    universityEmail: email,
                    displayName: 'Mock User',
                    role: 'Student', // Default to Student for now
                    department: 'Computer Science'
                };

                // Simple check for demo credentials to assign roles
                if (email.includes('admin')) mockUser.role = 'Admin';
                if (email.includes('staff')) mockUser.role = 'Staff';

                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 500); // network delay
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

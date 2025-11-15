'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    User,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            console.log('👤 Auth state changed:', user?.email || 'No user');
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log('email:', email, password);   
            await signInWithEmailAndPassword(auth, email, password);
            console.log('✅ Login exitoso');
        } catch (error) {
            const authError = error as AuthError;
            console.error('❌ Error en login:', authError.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('✅ Logout exitoso');
        } catch (error) {
            console.error('❌ Error en logout:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

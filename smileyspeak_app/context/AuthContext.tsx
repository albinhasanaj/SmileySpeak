"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch('/api/auth/check');
                if (!response.ok) {
                    throw new Error('Not authenticated');
                }
                setIsAuthenticated(true);
            } catch (error: any) {
                setIsAuthenticated(false);
            }
        }
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    };
    return context;
}
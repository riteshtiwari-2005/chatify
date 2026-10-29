import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const storedUser = localStorage.getItem("ChatApp");
    const [authUser, setAuthUser] = useState(() => {
        if (!storedUser) {
            return undefined;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            localStorage.removeItem("ChatApp");
            return undefined;
        }
    });

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

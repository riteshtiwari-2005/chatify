import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const initialUserState = localStorage.getItem("ChatApp");

    const [authUser, setAuthUser] = useState(() => {
        try {
            return initialUserState ? JSON.parse(initialUserState) : undefined;
        } catch {
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

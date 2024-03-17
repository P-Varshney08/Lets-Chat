import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    // Initialize authUser state with null if "chat-user" doesn't exist or is not in valid JSON format
    const [authUser, setAuthUser] = useState(() => {
        try {
            console.log(localStorage.getItem("chat-user"))
            return JSON.parse(localStorage.getItem("chat-user")) || null;
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            return null;
        }
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

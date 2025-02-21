import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    //ça devrait permettre de récup l'utilisateur au chargement de l'appli...
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:5000/api/auth/me", {
                    credentials: "include"
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            }
        }
        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

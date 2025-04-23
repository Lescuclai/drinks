import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext<User | null>(null);

interface User {
    id: string | null;
}

const UserProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ id: user.uid });
            } else {
                setUser({ id: null });
            }
        });
    }, []);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUserContext = () => useContext(UserContext);

export default UserProvider;

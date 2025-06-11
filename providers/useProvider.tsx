import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/supabase";

const UserContext = createContext<User | null>(null);

interface User {
    id: string | null;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data && data.user) {
                setUser({ id: data.user.id });
            } else {
                setUser({ id: null });
            }
        };
        getUser();
    }, []);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUserContext = () => useContext(UserContext);

export default UserProvider;

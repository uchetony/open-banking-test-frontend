import { useState, Dispatch, SetStateAction, useContext } from 'react';
import { createContext } from 'react';

type User = {
    email: string
}

type SetUser = Dispatch<SetStateAction<User>>;

const UserContext = createContext<[user: User, setUser: SetUser] | undefined>(undefined);

function UserProvider({ children }: { children: JSX.Element }) {
    const [user, setUser] = useState({} as User);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext);

    if (context == null) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context;
}

export { UserProvider, useUser };


import { createContext, useContext, useState } from 'react';

type UserData = {
  firstName: string;
  lastName: string;
  photo: string | null;
};

type UserContextType = {
  userData: UserData;
  setUserData: (data: UserData) => void;
};

const UserContext = createContext<UserContextType>({
  userData: { firstName: '', lastName: '', photo: null },
  setUserData: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    photo: null,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

import { createContext, ReactNode, useState } from "react";
import { Role } from "../types";

type SimpleUser = { email?: string; role: Role };

interface UserContextType {
  setUser: (user: SimpleUser) => void;
  user: SimpleUser;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  user: {
    role: Role.VISITOR,
  },
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email?: string; role: Role }>({
    role: Role.VISITOR,
  });

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
}

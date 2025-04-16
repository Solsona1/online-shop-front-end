import { FC, ReactNode } from "react";
import { useUser } from "../../hooks/useUser";
import { Role } from "../../types";
import { Navigate } from "react-router-dom";

interface IPropsPrivateRoute {
  authorizedRole: Role;
  children: ReactNode;
}

export const PrivateRoute: FC<IPropsPrivateRoute> = ({
  authorizedRole,
  children,
}) => {
  const { user } = useUser();

  if ((user.role as Role) === (authorizedRole as Role)) {
    return children;
  } else {
    return <Navigate replace to={"/"} />;
  }
};

import React, { ComponentType } from "react";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AuthContextType } from "./types/user";

type HOCProps<P> = P & {
  children?: React.ReactNode;
};

export default function withAuth<P>(
  WrappedComponent: ComponentType<HOCProps<P>>
): React.FC<HOCProps<P>> {
  const AuthProtectedPage: React.FC<HOCProps<P>> = (props: HOCProps<P>) => {
    const { authenticated, waitAuthCheck } = useAuth() as AuthContextType;
    console.log({ authenticated, waitAuthCheck });

    if (waitAuthCheck) {
      console.log("waiting for auth check");
      return <div>Loading...</div>;
    } else if (!waitAuthCheck && !authenticated) {
      console.log("not authenticated");
      return <Navigate to="/auth/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthProtectedPage;
}

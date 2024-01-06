import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};

export default AuthLayout;

import React, { HTMLProps, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface Prop extends HTMLProps<HTMLDivElement> {}

const ProtectCustomer = ({ children }: Prop) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      if (!pathname.startsWith("/order")) {
        navigate("/order/companies");
      }
    } else {
      if (!pathname.startsWith("/sign")) {
        navigate("/signin");
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ProtectCustomer;

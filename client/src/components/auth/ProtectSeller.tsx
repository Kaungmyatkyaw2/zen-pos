import React, { HTMLProps, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface Prop extends HTMLProps<HTMLDivElement> {}

const ProtectSeller = ({ children }: Prop) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      if (pathname.startsWith("/order")) {
        navigate("/");
      }
    } else {
      if (!pathname.startsWith("/sign")) {
        navigate("/signin");
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ProtectSeller;

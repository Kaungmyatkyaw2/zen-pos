import React, { HTMLProps, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLazyGetmeQuery } from "../../store/service/auth-endpoints/Auth.endpoints";
import { insertCompany, insertUser } from "../../store/slice/User.slice";
import { RootState } from "../../store/store";
import { ScreenLoader } from "../loader";
import ProtectSeller from "./ProtectSeller";
import ProtectCustomer from "./ProtectCustomer";

const ProtectRoute = ({ children }: HTMLProps<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [getme, response] = useLazyGetmeQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.access_token);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (token) {
      getme(true);
    } else {
      setIsLoading(false);
      navigate("/signin");
    }
  }, [token]);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(insertUser(response.data));
      dispatch(insertCompany(response.data.company));
      if (!response.isFetching) {
        setIsLoading(false);
        if (location.pathname.includes("sign")) {
          if (response.data.role === "SELLER") {
            navigate("/");
          } else {
            navigate("/order/companies");
          }
        }
      }
    }

    if (response.isError) {
      setIsLoading(false);
    }
  }, [response]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      {user?.role === "SELLER" ? (
        <ProtectSeller>{children}</ProtectSeller>
      ) : (
        <ProtectCustomer>{children}</ProtectCustomer>
      )}
    </>
  );
};

export default ProtectRoute;

import React, { HTMLProps, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetmeQuery } from "../../store/service/auth-endpoints/Auth.endpoints";
import { insertCompany, insertUser } from "../../store/slice/User.slice";
import { RootState } from "../../store/store";
import { ScreenLoader } from "../loader";

const ProtectRoute = ({ children }: HTMLProps<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [getme, response] = useLazyGetmeQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.access_token);

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
          navigate("/");
        }
      }
    } else {
      navigate("/signin");
    }

    if (response.isError) {
      setIsLoading(false);
    }
  }, [response]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return <>{children}</>;
};

export default ProtectRoute;

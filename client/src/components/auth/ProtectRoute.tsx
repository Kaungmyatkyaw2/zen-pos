import React, { HTMLProps, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyGetmeQuery } from "../../store/service/auth-endpoints/Auth.endpoints";
import { insertCompany, insertUser } from "../../store/slice/User.slice";
import { RootState } from "../../store/store";
import { ScreenLoader } from "../loader";

const ProtectRoute = ({ children }: HTMLProps<HTMLDivElement>) => {
  const [getme, response] = useLazyGetmeQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.access_token);

  useEffect(() => {
    if (token) {
      getme(true);
    } else {
      navigate("/signin");
    }
  }, [token]);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(insertUser(response.data));
      dispatch(insertCompany(response.data.company));
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [response]);

  if (response.isLoading) {
    return <ScreenLoader />;
  }

  return <>{children}</>;
};

export default ProtectRoute;

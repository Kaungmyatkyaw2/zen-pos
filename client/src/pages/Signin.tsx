import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputField, BtnPrimary } from "../components/form";
import { useSigninMutation } from "../store/service/auth-endpoints/Auth.endpoints";
import { login } from "../store/slice/Auth.slice";

export const Signin = () => {
  const [signin, response] = useSigninMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isSeller: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(login(response.data.access_token));
    }
  }, [response]);

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signin(formData);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Sign in</h1>
        <form
          onSubmit={(e) => handleSignin(e)}
          className="w-full space-y-[15px]"
        >
          <InputField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.currentTarget.value })
            }
          />
          <InputField
            name="password"
            label="Password"
            placeholder="example password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.currentTarget.value })
            }
          />
          <div className="pt-[10px]">
            <BtnPrimary
              disabled={!formData.email.length || formData.password.length < 6}
              width={"full"}
              isLoading={response.isLoading}
            >
              Log in
            </BtnPrimary>
          </div>
          <div className="pt-[5px]">
            <NavLink to="/signup">Doesn't have an account ? Create one</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

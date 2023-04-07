import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputField, BtnPrimary } from "../components/form";
import { useSigninMutation } from "../store/service/auth-endpoints/Auth.endpoints";
import { login } from "../store/slice/Auth.slice";

export const Signin = () => {
  const [signin, response] = useSigninMutation();
  const form = useRef<HTMLFormElement>(null!);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(login(response.data.access_token));
    }
  }, [response]);


  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const payload = Object.fromEntries(formData);

    signin(payload);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Sign in</h1>
        <form
          ref={form}
          onSubmit={(e) => handleSignin(e)}
          className="w-full space-y-[15px]"
        >
          <InputField
            name="email"
            label="Email"
            placeholder="example@gmail.com"
          />
          <InputField
            name="password"
            label="Password"
            placeholder="example password"
          />
          <div className="pt-[10px]">
            <BtnPrimary width={"full"} isLoading={response.isLoading}>
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

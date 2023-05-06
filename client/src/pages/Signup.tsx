import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputField, BtnPrimary } from "../components/form";
import { useSignupMutation } from "../store/service/auth-endpoints/Auth.endpoints";
import { login } from "../store/slice/Auth.slice";

export const Signup = () => {
  const [signup, response] = useSignupMutation();
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

    signup({ ...payload, isSeller: false });
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
          <InputField name="name" label="Name" placeholder="Example name" />
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
              Sign up
            </BtnPrimary>
          </div>
          <div className="pt-[5px]">
            <NavLink to="/signin">Already had an account ? Log in.</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

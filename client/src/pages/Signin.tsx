import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputField, BtnPrimary } from "../components/form";
import { useSigninMutation } from "../store/service/auth-endpoints/Auth.endpoints";
import { login } from "../store/slice/Auth.slice";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { signInValidate } from "../formik";

export const Signin = () => {
  const [signin, response] = useSigninMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(login(response.data.access_token));
    } else if (response.isError) {
      // @ts-ignore
      toast.error("An error Occured");
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: signInValidate,
    onSubmit: (values) => {
      handleSignin(values);
    },
  });

  const handleSignin = (payload: any) => {
    signin({ ...payload, isSeller: true });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Sign in</h1>
        <form onSubmit={formik.handleSubmit} className="w-full space-y-[15px]">
          <InputField
            label="Email"
            placeholder="example@gmail.com"
            error={formik.errors.email}
            isTouched={formik.touched.email}
            {...formik.getFieldProps("email")}
          />
          <InputField
            label="Password"
            placeholder="example password"
            error={formik.errors.password}
            isTouched={formik.touched.password}
            type="password"
            {...formik.getFieldProps("password")}
          />
          <div className="pt-[10px]">
            <BtnPrimary
              disabled={
                !formik.values.email.length ||
                response.isLoading ||
                !formik.isValid
              }
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

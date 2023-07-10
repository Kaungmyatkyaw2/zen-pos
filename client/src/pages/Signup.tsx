import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputField, BtnPrimary, CheckboxToggle } from "../components/form";
import { useSignupMutation } from "../store/service/auth-endpoints/Auth.endpoints";
import { login } from "../store/slice/Auth.slice";
import { useFormik } from "formik";
import { signUpValidate } from "../formik";

export const Signup = () => {
  const [signup, response] = useSignupMutation();
  const [isSeller, setIsSeller] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(login(response.data.access_token));
    } else if (response.isError) {
      // @ts-ignore
      toast.error(response.error.data.message);
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: signUpValidate,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = (values: any) => {
    signup({ ...values, isSeller });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Sign in</h1>
        <form onSubmit={formik.handleSubmit} className="w-full space-y-[15px]">
          <InputField
            isTouched={formik.touched.name}
            error={formik.errors.name}
            label="Name"
            placeholder="Example name"
            {...formik.getFieldProps("name")}
          />
          <InputField
            isTouched={formik.touched.email}
            error={formik.errors.email}
            label="Email"
            placeholder="example@gmail.com"
            {...formik.getFieldProps("email")}
          />
          <InputField
            label="Password"
            isTouched={formik.touched.password}
            error={formik.errors.password}
            placeholder="example password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          <CheckboxToggle
            checked={isSeller}
            onChange={(e) => setIsSeller(e.currentTarget.checked)}
            leftName="Customer"
            rightName="Seller"
          />
          <div className="pt-[10px]">
            <BtnPrimary
              disabled={
                response.isLoading ||
                !formik.isValid ||
                !formik.values.email.length
              }
              width={"full"}
              isLoading={response.isLoading}
            >
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

type Error = {
  name?: string;
  email?: string;
  password?: string;
};

type Value = {
  name: string;
  email: string;
  password: string;
};

export const signUpValidate = (values: Value) => {
  const errors: Error = {};

  if (!values.name) {
    errors.name = "This field is required";
  }

  if (!values.email) {
    errors.email = "This field is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "This field is required";
  } else if (values.password.length < 6) {
    errors.password = "Must be longer then 5 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
};

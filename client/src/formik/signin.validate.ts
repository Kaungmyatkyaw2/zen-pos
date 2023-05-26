type Error = {
  email?: string;
  password?: string;
};

type Value = {
  email: string;
  password: string;
};

export const signInValidate = (values: Value) => {
  const errors: Error = {};

  if (!values.email) {
    errors.email = "This field is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "This field is required";
  } else if (values.password.length < 5) {
    errors.password = "Must be longer then 4 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
};

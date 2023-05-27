type Error = {
  name?: string;
  price?: string;
};

type Value = {
  name: string;
  price: string;
};

export const createMenuItemValidate = (values: Value) => {
  const errors: Error = {};

  if (!values.name) {
    errors.name = "This field is required";
  }

  if (!values.price) {
    errors.price = "This field is required";
  }
  return errors;
};

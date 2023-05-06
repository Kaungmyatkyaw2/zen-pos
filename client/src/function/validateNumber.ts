export const validateNumber = (
  event: React.KeyboardEvent<HTMLInputElement>,
  checkZero?: boolean
) => {
  let charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault();
  } else {
    if (checkZero) {
      if (event.currentTarget.value.length === 0) {
        if (charCode !== 48) {
          return true;
        } else {
          event.preventDefault();
        }
      } else {
        return true;
      }
    } else {
      return true;
    }

    return true;
  }
};

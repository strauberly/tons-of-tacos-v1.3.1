//  validation for customer form input fields

export function checkName(name: string) {
  const nameValid: Valid = {
    valid: false,
    message: "",
  };

  if (name.length === 0) {
    nameValid.message = "Name must not be blank";
  } else if (!/^S*[a-z]+$/.test(name.toLowerCase())) {
    nameValid.message = "Check for only valid characters and no spaces";
  } else if (
    (/^[a-z]+$/.test(name.toLowerCase().trim()) && name.length == 1) ||
    (/^[a-z]+$/.test(name.toLowerCase().trim()) && name.length > 16)
  ) {
    nameValid.message = "Name must be more than 1 and less than 16 characters";
  } else {
    nameValid.valid = true;
  }
  return nameValid;
}

export function checkPhone(phone: string) {
  const phoneValid: Valid = {
    valid: false,
    message: "",
  };

  if (phone.length === 0) {
    phoneValid.message = "Phone Number must not be blank";
  } else if (
    !/^[0-9.]{12}$/.test(phone) ||
    phone.charAt(3) != "." ||
    phone.charAt(7) != "."
  ) {
    phoneValid.message =
      "Ensure entered phone number matches the example: 555.555.5555";
  } else {
    phoneValid.valid = true;
  }
  return phoneValid;
}

export function checkEmail(email: string) {
  const emailValid: Valid = {
    valid: false,
    message: "",
  };

  if (email.length === 0) {
    emailValid.message = "Email must not be blank";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
    emailValid.message = "Please ensure e-mail is valid ex(johndoe@doe.com)";
  } else {
    emailValid.valid = true;
  }
  return emailValid;
}

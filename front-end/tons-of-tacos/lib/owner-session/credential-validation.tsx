export function checkID(id: string) {
  if (/^[a-z||\d]{7}$/.test(id)) {
    return true;
  } else {
    return false;
  }
}
export function checkPassword(password: string) {
  if (/^[a-zA-Z\d!@#$%^&*()_+=-]{8}$/.test(password)) {
    return true;
  } else {
    return false;
  }
}

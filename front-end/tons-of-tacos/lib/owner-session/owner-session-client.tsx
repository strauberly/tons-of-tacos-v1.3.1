export function StoreUser(userName: string) {
  // export function StoreUser(user: string) {
  if (sessionStorage.getItem("userName")) {
    // if (sessionStorage.getItem("user")) {
    sessionStorage.removeItem("userName");
    // sessionStorage.removeItem("user");
    sessionStorage.setItem("userName", userName);
    // sessionStorage.setItem("user", user);
  } else {
    sessionStorage.setItem("userName", userName);
    // sessionStorage.setItem("user", user);
  }
  console.log("user stored: " + `${userName}`);
  // console.log("user stored: " + `${user}`);
}
// fix this eliminate try catch
export function GetUser() {
  let user: string | null = "";
  try {
    if (sessionStorage.getItem("userName")) {
      // if (sessionStorage.getItem("user")) {
      user = sessionStorage.getItem("userName");
      // user = sessionStorage.getItem("user");
      return user as string;
    } else {
      throw new Error("nope");
    }
  } catch (error) {
    throw new Error("User not found: " + `${error}`);
  }
}

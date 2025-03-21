"use client";
export function getLogin() {
  const login: string = sessionStorage.getItem("login") || "null";
  return login;
}

export function logout() {
  sessionStorage.removeItem("login");
}

export function IsAuthenticated() {
  return sessionStorage.getItem("isAuthenticated") === "true";
}

export function storeLogin(successfulLogin: string) {
  console.log(successfulLogin);
  logout();
  sessionStorage.setItem("login", successfulLogin);
  // }
}

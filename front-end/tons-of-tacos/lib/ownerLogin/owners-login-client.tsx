"use client";
export function getLogin() {
  const login: string = sessionStorage.getItem("login") || "null";
  return JSON.parse(login) as OwnerLogin;
}

export function logout() {
  sessionStorage.removeItem("login");
  sessionStorage.removeItem("isAuthenticated");
}

export function IsAuthenticated() {
  return sessionStorage.getItem("isAuthenticated") === "true";
}

export function storeLogin(successfulLogin: string) {
  console.log(successfulLogin);
  logout();
  sessionStorage.setItem("login", successfulLogin);
  sessionStorage.setItem("isAuthenticated", "true");
  // }
}

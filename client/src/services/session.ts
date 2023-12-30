export class Session {
  static getAccessToken() {
    return localStorage.getItem("access_token");
  }

  static getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  static setAccessToken(token: string) {
    return localStorage.setItem("access_token", token);
  }

  static setRefreshToken(token: string) {
    return localStorage.setItem("refresh_token", token);
  }

  static logOut() {
    return localStorage.clear();
  }
}

import BaseService from "./BaseService";

export default class AuthService extends BaseService
{
  register(data) {
    return this.sendRequest('POST', 'register', data, false);
  }

  login(data) {
    const promise = this.sendRequest('POST', 'login', data, false);
    promise.then((data) => {
      window.localStorage.setItem('access_token', data.access_token);
      window.dispatchEvent(new Event('login'));
    });
    return promise;
  }

  logout() {
    window.localStorage.removeItem('access_token');
    window.dispatchEvent(new Event('logout'));
  }

  isLoggedIn() {
    const token = this.getAccessToken();
    if (typeof token !== 'string') {
      return false;
    }
    const parsedToken = this.parseJwt(token);

    return parsedToken['exp'] * 1000 > Date.now();
  }

  getAccessToken() {
    return window.localStorage.getItem('access_token');
  }

  parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
import BaseService from "./BaseService";

export default class AuthService extends BaseService
{
  register(data) {
    return this.sendRequest('POST', 'register', data);
  }

  login(data) {
    const promise = this.sendRequest('POST', 'login', data);
    promise.then((data) => {
      window.localStorage.setItem('access_token', data.access_token);
    });
    return promise;
  }

  logout() {
    window.localStorage.removeItem('access_token');
  }
}
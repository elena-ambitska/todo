import AuthService from "./AuthService";
import {redirect} from "../helpers";

export default class BaseService {
  getURL(path) {
    return 'https://rokupo-37fca.ondigitalocean.app/' + path;
  }

  sendRequest(type, path, data, withAuth) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, this.getURL(path), true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (withAuth) {
      const authService = new AuthService();
      if (!authService.isLoggedIn()) {
        redirect('login');
        return new window.Promise((resolve, reject) => {
          reject();
        });
      }

      const accessToken = authService.getAccessToken();
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    }

    xhr.send(JSON.stringify(data));
    const promise = new window.Promise((resolve, reject) => {
      xhr.onload = function() {
        const data = JSON.parse(this.responseText);
        if (this.status >= 200 && this.status < 300) {
          resolve(data);
        } else {
          reject(data);
        }
      };
      xhr.onerror = function() {
        const data = JSON.parse(this.responseText);
        reject(data);
      };
    });

    return promise;
  }
}
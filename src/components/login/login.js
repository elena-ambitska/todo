import template from './login.html';
import {getFormData, redirect, renderErrors} from "../../helpers";
import AuthService from "../../services/AuthService";

class LoginComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const auth = new AuthService();
      auth.login(data).then(() => {
        redirect('/lists');
      }, (data) => {
        renderErrors(data);
      });
    });
  }
}

customElements.define('login-form', LoginComponent);

export default LoginComponent;
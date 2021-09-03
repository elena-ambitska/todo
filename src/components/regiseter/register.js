import template from './register.html';
import AuthService from '../../services/AuthService';
import {getFormData, redirect, renderErrors} from '../../helpers';

class RegisterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;

    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const auth = new AuthService();
      auth.register(data).then(() => {
        redirect('/login');
      }, (data) => {
        renderErrors(data);
      });
    });
  }
}

customElements.define('register-form', RegisterComponent);

export default RegisterComponent;
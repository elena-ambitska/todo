import template from './register.html';
import AuthService from '../../services/AuthService';
import {getFormData} from '../../helpers';

class RegisterComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;

    shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const auth = new AuthService();
      auth.register(data);
    });
  }
}

customElements.define('register-form', RegisterComponent);

export default RegisterComponent;
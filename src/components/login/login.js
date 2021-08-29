import template from './login.html';
import {getFormData} from "../../helpers";
import AuthService from "../../services/AuthService";

class LoginComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const auth = new AuthService();
      auth.login(data);
    });
  }
}

customElements.define('login-form', LoginComponent);

export default LoginComponent;
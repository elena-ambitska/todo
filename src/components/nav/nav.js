import template from './nav.html';
import {redirect} from '../../helpers';
import AuthService from '../../services/AuthService';

class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;

    this.querySelector('#logout').addEventListener('click', (event) => {
      event.preventDefault();

      (new AuthService()).logout();
      redirect('/login');
    });
  }
}

customElements.define('my-nav', NavComponent);

export default NavComponent;
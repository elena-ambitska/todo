import template from './nav.html';
import {redirect} from '../../helpers';
import AuthService from '../../services/AuthService';

class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;

    const logoutBtn = this.querySelector('#logout');
    const authService = (new AuthService());

    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();

      authService.logout();
      redirect('/login');
    });

    if (authService.isLoggedIn()) {
      logoutBtn.classList.remove('hidden');
    } else {
      logoutBtn.classList.add('hidden');
    }

    window.addEventListener('login', () => {
      logoutBtn.classList.remove('hidden');
    });

    window.addEventListener('logout', () => {
      logoutBtn.classList.add('hidden');
    });
  }
}

customElements.define('my-nav', NavComponent);

export default NavComponent;
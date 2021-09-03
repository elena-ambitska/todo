import routes from '../../routes';
import template from './router.html';

class RouterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;

    window.addEventListener('popstate', () => {
      this.route();
    });

    window.addEventListener('pushstate', () => {
      this.route();
    });

    this.route();
  }

  route() {
    const pathname = window.location.pathname;
    for (const key in routes) {
      let regExp;
      try {
        regExp = new RegExp(key);
      } catch (e) {
        continue;
      }
      if (regExp.test(pathname)) {
        this.innerHTML = routes[key];
        return;
      }
    }

    this.innerHTML = '<login-form></login-form>';
  }
}

customElements.define('my-router', RouterComponent);
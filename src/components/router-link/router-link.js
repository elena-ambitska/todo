import template from './router-link.html';
import {redirect} from "../../helpers";

class RouterLinkComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    const anker = shadowRoot.querySelector('a');
    anker.addEventListener('click', (event) => {
        event.preventDefault();
        redirect(event.currentTarget.getAttribute('href'));
      });
    anker.setAttribute('href', this.getAttribute('href'));
  }
}

customElements.define('my-router-link', RouterLinkComponent);
import template from './router-link.html';
import {redirect} from "../../helpers";

class RouterLinkComponent extends HTMLElement {
  connectedCallback() {
    const slot = this.innerHTML;
    this.innerHTML = template.replace('<slot></slot>', slot);
    const anker = this.querySelector('a');
    anker.addEventListener('click', (event) => {
        event.preventDefault();
        redirect(event.currentTarget.getAttribute('href'));
      });
    anker.setAttribute('href', this.getAttribute('href'));
  }
}

customElements.define('my-router-link', RouterLinkComponent);
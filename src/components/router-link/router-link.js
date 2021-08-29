import template from './router-link.html';

class RouterLinkComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    const anker = shadowRoot.querySelector('a');
    anker.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState({}, '', event.currentTarget.getAttribute('href'));
        const pushEvent = new Event('pushstate');
        window.dispatchEvent(pushEvent);
      });
    anker.setAttribute('href', this.getAttribute('href'));
  }
}

customElements.define('my-router-link', RouterLinkComponent);
import template from './icon-btn.html';

class IconBtnComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = template.replace('{icon}', this.getAttribute('icon'));
        this.querySelector('a').classList.add(...this.getAttribute('class').split(' '));
        this.removeAttribute('class');
    }

    show() {
        this.querySelector('a').classList.remove('hidden');
    }

    hide() {
        this.querySelector('a').classList.add('hidden');
    }
}

customElements.define('icon-btn', IconBtnComponent);

export default IconBtnComponent;
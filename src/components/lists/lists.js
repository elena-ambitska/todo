import template from './lists.html';
import {getFormData} from "../../helpers";
import ListService from "../../services/ListService";

class ListsComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const listService = new ListService();
      listService.create(data).then((item) => {
        this.renderItem(item);
      });
    });

    this.getLists();
  }

  getLists() {
    (new ListService()).getAll().then((data) => {
      const ul = this.shadowRoot.querySelector('ul');
      ul.innerText = '';
      data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const ul = this.shadowRoot.querySelector('ul');
    const a = document.createElement('a');
    a.innerText = item.name;
    a.setAttribute('href', '/lists/' + item.id);
    const li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
}

customElements.define('my-lists', ListsComponent);

export default ListsComponent;
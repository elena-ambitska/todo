import template from './list-view.html';
import {getFormData} from "../../helpers";
import ListService from "../../services/ListService";
import TodoService from "../../services/TodoService";

class ListViewComponent extends HTMLElement {
  connectedCallback() {
    this.listId = this.getListId();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const todoService = new TodoService();
      todoService.create(this.listId, data).then((item) => {
        this.renderItem(item);
      });
    });

    this.getList();
    this.getTodos();
  }

  getList() {
    (new ListService()).get(this.listId).then((data) => {
      this.shadowRoot.querySelector('h2').innerText = data.name;
    });
  }

  getTodos() {
    (new TodoService()).getAll(this.listId).then((data) => {
      const ul = this.shadowRoot.querySelector('ul');
      ul.innerText = '';
      data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const ul = this.shadowRoot.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = item.name;
    ul.appendChild(li);
  }

  getListId() {
    const regex = /lists\/([0-9a-z]+)/;
    return window.location.pathname.match(regex)[1];
  }
}

customElements.define('list-view', ListViewComponent);

export default ListViewComponent;
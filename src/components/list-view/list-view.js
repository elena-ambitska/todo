import template from './list-view.html';
import {getFormData} from "../../helpers";
import ListService from "../../services/ListService";
import TodoService from "../../services/TodoService";

class ListViewComponent extends HTMLElement {
  connectedCallback() {
    this.listId = this.getListId();
    this.todoListService = new TodoService();

    this.innerHTML = template;
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      this.todoListService.create(this.listId, data).then((item) => {
        this.renderItem(item);
      });
    });

    this.getList();
    this.getTodos();
  }

  getList() {
    (new ListService()).get(this.listId).then((data) => {
      this.querySelector('h2').innerText = data.name;
    });
  }

  getTodos() {
    this.todoListService.getAll(this.listId).then((data) => {
      const ul = this.querySelector('ul');
      ul.innerText = '';
      data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const ul = this.querySelector('ul');
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('role', 'switch');
    if (item.is_done) {
      checkbox.setAttribute('checked', '');
    }
    checkbox.addEventListener('change', (event) => {
      if (event.currentTarget.checked) {
        this.todoListService.markDone(this.listId, item.id);
      } else {
        this.todoListService.markUndone(this.listId, item.id);
      }
    });

    li.innerText = item.name;

    li.prepend(checkbox);
    ul.appendChild(li);
  }

  getListId() {
    const regex = /lists\/([0-9a-z]+)/;
    return window.location.pathname.match(regex)[1];
  }
}

customElements.define('list-view', ListViewComponent);

export default ListViewComponent;
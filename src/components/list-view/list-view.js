import template from './list-view.html';
import {getFormData, renderErrors} from "../../helpers";
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
      }, (data) => {
        renderErrors(data);
      });
    });

    this.getList();
    this.getTodos();
  }

  getList() {
    (new ListService()).get(this.listId).then((data) => {
      this.querySelector('.current-list').innerText = data.name;
    });
  }

  getTodos() {
    this.todoListService.getAll(this.listId).then((data) => {
      this.ul = this.querySelector('ul');
      this.ul.innerText = '';
      data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const text= document.createElement('span');
    const deleteBtn = document.createElement('a');

    deleteBtn.setAttribute('role', 'button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = 'X';

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

    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const confirm = window.confirm('Are you sure?');
      if (confirm) {
        this.todoListService.delete(this.listId, item.id).then(() => {
          li.remove();
        });
      }
    });

    label.append(checkbox);
    text.innerText = item.name;
    label.append(text);
    label.classList.add('list-item');
    label.append(deleteBtn);
    li.append(label);
    li.classList.add('fade-animation');
    this.ul.appendChild(li);
  }

  getListId() {
    const regex = /lists\/([0-9a-z]+)/;
    return window.location.pathname.match(regex)[1];
  }
}

customElements.define('list-view', ListViewComponent);

export default ListViewComponent;
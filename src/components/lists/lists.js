import template from './lists.html';
import {getFormData, renderErrors} from "../../helpers";
import ListService from "../../services/ListService";

class ListsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const listService = new ListService();
      listService.create(data).then((item) => {
        this.renderItem(item);
      }, (data) => {
        renderErrors(data);
      });
    });

    this.getLists();
  }

  getLists() {
    (new ListService()).getAll().then((data) => {
      this.ul = this.querySelector('ul');
      this.ul.innerText = '';
      data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const a = document.createElement('my-router-link');
    const deleteBtn = document.createElement('a');

    a.innerText = item.name;
    a.classList.add('list-item');
    a.setAttribute('href', '/lists/' + item.id);
    const li = document.createElement('li');
    li.appendChild(a);
    li.classList.add('fade-animation');
    this.ul.appendChild(li);

    deleteBtn.setAttribute('role', 'button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = 'X';

    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const confirm = window.confirm('Are you sure?');
      if (confirm) {
        (new ListService()).delete(item.id).then(() => {
          li.remove();
        });
      }
    });

    a.querySelector('a').appendChild(deleteBtn);
  }
}

customElements.define('my-lists', ListsComponent);

export default ListsComponent;
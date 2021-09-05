import template from './list-view.html';
import {
  getFormData,
  renderErrors
} from "../../helpers";
import ListService from "../../services/ListService";
import TodoService from "../../services/TodoService";
import '../icon-btn/icon-btn';


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
    const text = document.createElement('span');
    const deleteBtn = document.createElement('icon-btn');
    const editBtn = document.createElement('icon-btn');
    const applyBtn = document.createElement('icon-btn');
    const cancelBtn = document.createElement('icon-btn');
    const input = document.createElement('input');
    input.classList.add('hidden');
 
    deleteBtn.setAttribute('class','delete-btn');
    deleteBtn.setAttribute('icon', 'close');

    editBtn.setAttribute('class','edit-btn');
    editBtn.setAttribute('icon', 'edit');

    applyBtn.setAttribute('class','apply-btn hidden');
    applyBtn.setAttribute('icon', 'check');
  
    cancelBtn.setAttribute('class','cancel-btn hidden');
    cancelBtn.setAttribute('icon', 'close');

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

    editBtn.addEventListener('click', (event) => {
      event.preventDefault();
      
      input.value = text.innerText;
      text.style.display = 'none';
      input.classList.remove('hidden');
      input.focus();
      applyBtn.show();
      cancelBtn.show();
      editBtn.hide();
      deleteBtn.hide();
    });

    applyBtn.addEventListener('click', (event) =>{
      event.preventDefault();
      this.saveToDoItem(item, input, text);
      this.cancelToDoItem(applyBtn, cancelBtn, editBtn, deleteBtn, input, text);

    });
    input.addEventListener('keyup', (evt) =>{
      if (evt.key == 'Enter') {
       this.saveToDoItem(item, input, text);
       this.cancelToDoItem (applyBtn, cancelBtn, editBtn, deleteBtn, input, text);
      }

    });

    cancelBtn.addEventListener('click', (event)=>{
      event.preventDefault();
      this.cancelToDoItem(applyBtn, cancelBtn, editBtn, deleteBtn, input, text);
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
    label.append(input);
    label.append(deleteBtn);
    label.append(editBtn);
    label.append(cancelBtn);
    label.append(applyBtn);
    li.append(label);
    li.classList.add('fade-animation');
    this.ul.appendChild(li);
  }

  getListId() {
    const regex = /lists\/([0-9a-z]+)/;
    return window.location.pathname.match(regex)[1];
  }

  saveToDoItem(item, input, text) {
    this.todoListService.update(this.listId, item.id, {name: input.value}).then(() =>{
      text.innerText = input.value;
      
    });
  }

  cancelToDoItem (applyBtn, cancelBtn, editBtn, deleteBtn, input, text){
    applyBtn.hide();
    cancelBtn.hide();
    editBtn.show();
    deleteBtn.show();
    input.classList.add('hidden');
    text.style.display = '';
  }
}

customElements.define('list-view', ListViewComponent);

export default ListViewComponent;
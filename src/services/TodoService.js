import BaseService from "./BaseService";

export default class TodoService extends BaseService
{
  update(listID, id, data) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id, data, true);
  }

  markDone(listID, id) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id + '/done', {}, true);
  }

  markUndone(listID, id) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id + '/undone', {}, true);
  }

  delete(listID, id) {
    return this.sendRequest('DELETE', this.getBasePath(listID) + '/' + id, {}, true);
  }

  get(listID, id) {
    return this.sendRequest('GET', this.getBasePath(listID) + '/' + id, {}, true);
  }

  create(listID, data) {
    return this.sendRequest('POST', this.getBasePath(listID), data, true);
  }

  getAll(listID) {
    return this.sendRequest('GET', this.getBasePath(listID), {}, true);
  }

  getBasePath(listID) {
    return 'lists/' + listID + '/items';
  }
}
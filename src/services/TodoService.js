import BaseService from "./BaseService";

export default class TodoService extends BaseService
{
  update(listID, id, data) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id, data);
  }

  markDone(listID, id) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id + '/done');
  }

  markUndone(listID, id) {
    return this.sendRequest('PUT', this.getBasePath(listID) + '/' + id + '/undone');
  }

  delete(listID, id) {
    return this.sendRequest('DELETE', this.getBasePath(listID) + '/' + id);
  }

  get(listID, id) {
    return this.sendRequest('GET', this.getBasePath(listID) + '/' + id);
  }

  create(listID, data) {
    return this.sendRequest('POST', this.getBasePath(listID), data);
  }

  getAll(listID) {
    return this.sendRequest('GET', this.getBasePath(listID));
  }

  getBasePath(listID) {
    return 'lists/' + listID + '/items';
  }
}
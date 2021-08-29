import BaseService from "./BaseService";

export default class ListService extends BaseService
{
  path = 'lists';

  update(id, data) {
    return this.sendRequest('PUT', this.path + '/' + id, data);
  }

  delete(id) {
    return this.sendRequest('DELETE', this.path + '/' + id);
  }

  get(id) {
    return this.sendRequest('GET', this.path + '/' + id);
  }

  create(data) {
    return this.sendRequest('POST', this.path, data);
  }

  getAll() {
    return this.sendRequest('GET', this.path);
  }
}
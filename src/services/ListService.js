import BaseService from "./BaseService";

export default class ListService extends BaseService
{
  path = 'lists';

  update(id, data) {
    return this.sendRequest('PUT', this.path + '/' + id, data, true);
  }

  delete(id) {
    return this.sendRequest('DELETE', this.path + '/' + id, {}, true);
  }

  get(id) {
    return this.sendRequest('GET', this.path + '/' + id, {}, true);
  }

  create(data) {
    return this.sendRequest('POST', this.path, data, true);
  }

  getAll() {
    return this.sendRequest('GET', this.path, {}, true);
  }
}
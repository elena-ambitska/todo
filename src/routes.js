import './components/login/login';
import './components/regiseter/register';
import './components/lists/lists';
import './components/list-view/list-view';

export default {
  'login': '<login-form></login-form>',
  'register': '<register-form></register-form>',
  'lists$': '<my-lists></my-lists>',
  'lists\\/([0-9a-z]+)': '<list-view></list-view>',
};
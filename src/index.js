import './styles/index.scss';
import './components/router/router';
import './components/router-link/router-link';
import './components/nav/nav';

if (process.env.NODE_ENV === 'development') {
  require('./index.html');
}

console.log('webpack starterkit');

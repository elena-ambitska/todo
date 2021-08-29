import './styles/index.scss';
import './components/regiseter/register';
import './components/router/router';
import './components/router-link/router-link';

if (process.env.NODE_ENV === 'development') {
  require('./index.html');
}

console.log('webpack starterkit');

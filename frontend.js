const { createElement: h } = require('react');
const { render } = require('react-dom');
const App = require('./app');

const root = document.getElementById('app');

render(h(App), root);

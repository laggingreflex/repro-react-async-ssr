const { createElement: h } = require('react')
const { render, unstable_createRoot: createRoot } = require('react-dom')
const App = require('./app')

const root =  document.getElementById('app');
const rooted = root.root || (root.root = createRoot(root));
rooted.render(h(App))
// render(h(App), document.getElementById('app'));

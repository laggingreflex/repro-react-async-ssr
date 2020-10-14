const { createElement: h } = require('react');
const { renderToStringAsync } = require('react-async-ssr');
const { DataExtractor } = require('react-lazy-data/server');
const express = require('express');
const App = require('./app');

const app = express();
const port = 8081;

app.get('*', async (req, res) => {
  const app = h(App);
  const extractor = new DataExtractor();
  const renderedApp = await renderToStringAsync(extractor.collectData(app));
  const extractorScript = extractor.getScript();
  console.log({ renderedApp, extractorScript });
  // html += extractorScript;
  res.end(`<body><div id="app">${renderedApp}</div>${extractorScript}</body>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

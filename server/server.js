const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
require('./config/routes')(app, express);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

const port = process.env.PORT || 3005;
console.log(`server running on port ${port}`);
// start listening to requests on port 3005
app.listen(port);

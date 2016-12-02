'use strict';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/redux');

let app = express();
app.use(bodyParser.json());

import api from './routes/api';

app.use('/api', api);
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot:true,
  publicPath: webpackConfig.output.publicPath,
  noInfo:true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () =>{
  console.log(`Listening on port 3000`);
});

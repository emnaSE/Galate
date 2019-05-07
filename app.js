'use strict';


const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router/routerForTest');
const config = require('./src/config');
const app = express();
var cors = require('cors')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(cors())

const server = app.listen(config.port,
  err => handleServerListening(err, server));



function handleServerListening(err, server) {
  if (err)
    return console.error('[!] Catched an error while listening:\n', err);
  console.log(`[*] Server started on port ${config.port}`);
}


















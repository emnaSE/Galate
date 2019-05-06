'use strict';


const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router/router.js');
const config = require('./src/config');
const app = express();




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(config.port,
  err => handleServerListening(err, server));



function handleServerListening(err, server) {
  if (err)
    return console.error('[!] Catched an error while listening:\n', err);
  console.log(`[*] Server started on port ${config.port}`);
}


















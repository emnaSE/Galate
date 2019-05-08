'use strict';

const router = require('express').Router();
router.use((req, res, next) => {
  res.payload = {};
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
router.use((req, res, next) => {
  res.payload = {};
  next();
});








  /**
 * Last route, handles not found.
 */
router.use((req, res) => {
if (req.xhr)
  return res.status(404).json({
    message: 'Could not find the resource you were looking for',
  });
return res.status(404).render('not-found');
});

module.exports = router;

'use strict';

const router = require('express').Router();





const DISCOUNT=5/100;
router.use((req, res, next) => {
  res.payload = {};
  res.payload.discount=DISCOUNT;
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

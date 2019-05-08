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




router.use('/admin', require('./adminRouter'));
//router.use('/order', require('./order'));
//router.use('/client', require('./client'));






module.exports = router;
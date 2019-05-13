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
router.use('/member', require('./memberRouter'));
router.use('/calcul', require('./calculRouter'));






module.exports = router;
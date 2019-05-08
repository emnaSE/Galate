const router = require('express').Router();
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });







router.use('/admin', require('./adminRouter'));
router.use('/member', require('./memberRouter'));














module.exports = router;
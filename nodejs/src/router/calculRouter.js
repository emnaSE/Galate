'use strict';

const router = require('express').Router();
const calculController = require('../controller/calculController');
const adminController = require('../controller/adminController');
const memberController = require('../controller/memberController');
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
};
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



var getRawBody = require('raw-body')
router.use(bodyParser.urlencoded({ extended: true }));
//etalonnage 
router.post('/createEtalonnage', (req, res, next) =>
    memberController.getRawBody(req)
        .then(etalonnage => {
            res.payload.etalonnage = etalonnage;
            return calculController.createEtalonnage(etalonnage)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));


router.post('/updateEtalonnage', (req, res, next) =>
    memberController.getRawBody(req)
        .then(etalonnage => {
            return calculController.updateEtalonnage(req, etalonnage)
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/deleteEtalonnage', urlencodedParser, (req, res, next) =>
    calculController.deleteEtalonnage(req)
        .then(msg => {
            res.send(msg);
        })
        .catch(next));

router.get('/getAllEtalonnages', urlencodedParser, (req, res, next) =>
    calculController.getAllEtalonnages(req)
        .then(etalonnages => {
            res.send(etalonnages);
        })
        .catch(next));
router.get('/getEtalonnageById', urlencodedParser, (req, res, next) =>
    calculController.getEtalonnageById(req)
        .then(etalonnage => {
            res.send(etalonnage);
        })
        .catch(next));


router.get('/getLineSum', urlencodedParser, (req, res, next) =>
    calculController.getLineSum(req)
        .then(sum => {

            calculController.createManuelAnswer(req, sum);
        })
        .then(response => {
            res.send(response);
        })
        .catch(next));

router.get('/getEtalonnageValue', urlencodedParser, (req, res, next) =>
        calculController.getEtalonnageValue(req)
            .then(value => {
                calculController.setEtalonnageValue(req, value);
            }).then(response => {
                res.send(response);
            })
            .catch(next));
    


module.exports = router;
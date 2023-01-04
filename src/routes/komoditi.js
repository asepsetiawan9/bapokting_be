const komoditi = require('express').Router();
const authMiddle = require('../middleware/auth');
const { body } = require('express-validator');
const komoditiController = require('../controllers/komoditi');
const validationCheck = require('../middleware/checkValidation');

// profileUser.get('/', authMiddle, body('limit').toInt(), body('page').toInt(), profileController.welcome);
komoditi.post('/komoditi-add', authMiddle, validationCheck, komoditiController.komoditiAdd);
komoditi.post('/komoditi-price', authMiddle, validationCheck, komoditiController.komoditiPrice);
komoditi.get('/list', komoditiController.komoditiList);

module.exports = komoditi;
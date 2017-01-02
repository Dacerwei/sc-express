var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var payerAddress = req.param('payerAddress');
	var amount = req.param('amount');
	var smartContractAddress = req.param('smartContractAddress');
	res.send('send');
});

module.exports = router;
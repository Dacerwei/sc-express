var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var totalAmount = req.param('totalAmount');
	var num = req.param('num');
	var owenrAddress = req.param('owenrAddress');
	res.send('build smart contract' + ' totalAmount: ' + totalAmount+' ppls: '+num+ ' owenrAddress: '+ owenrAddress);
});

module.exports = router;
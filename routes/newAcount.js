var express = require('express');
var web3 = require('web3');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var user_id = req.param('id');
	var initAmount = 10;
	res.send('creat new acount - '+ user_id + ' initial amount: ' + initAmount);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8000"));
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	var payerAddress = req.param('payerAddress');
	var amount = req.param('amount');
	var smartContractAddress = req.param('smartContractAddress');
	var payerPassword = req.param('payerPassword');

	web3.personal.unlockAccount(payerAddress, payerPassword);
	var dealContract = web3.eth.contract([
	{
		"constant":true,"inputs":[],
		"name":"accumulated_payment",
		"outputs":[{"name":"","type":"uint256"}],
		"payable":false,
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[],
		"name":"num_people",
		"outputs":[{"name":"","type":"uint256"}],
		"payable":false,
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[],
		"name":"totalamount",
		"outputs":[{"name":"","type":"uint256"}],
		"payable":false,
		"type":"function"
	},
	{
		"constant":false,
		"inputs":[{"name":"money","type":"uint256"}],
		"name":"pay",
		"outputs":[{"name":"","type":"uint256"}],
		"payable":true,
		"type":"function"
	},
	{
		"inputs":[{"name":"amount","type":"uint256"},{"name":"people","type":"uint256"}],
		"payable":false,
		"type":"constructor"
	}
	]);

	// var theDeal = dealContract.at(smartContractAddress);
	// theDeal.pay.sendTransaction(web3.toWei(amount,"ether"),{from:payerAddress, value:web3.toWei(amount,"ether")});

	web3.eth.sendTransaction({
		from: payerAddress,
		to: web3.eth.accounts[19],
		value: web3.toWei(amount,'ether')
	});

	res.json({
		"state": true
	});

});

module.exports = router;
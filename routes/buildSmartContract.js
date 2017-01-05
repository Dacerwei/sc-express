var express = require('express');
var router = express.Router();
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8000"));
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	var totalAmount = req.param('totalAmount');
	var num = req.param('num');
	var ownerAddress = req.param('ownerAddress');
	var ownerPassword = req.param('ownerPassword')

	web3.personal.unlockAccount(ownerAddress,ownerPassword);

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
	var deal = dealContract.new( totalAmount, num,{
		from: web3.eth.accounts[1], 
		data: '0x606060405234610000576040516040806103a3833981016040528080519060200190919080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550816001819055508060028190555060006003819055505b50505b61030f806100946000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480630783c90b1461005957806347fae3931461007c5780639ca0cf2a1461009f578063c290d691146100c2575b610000565b34610000576100666100ee565b6040518082815260200191505060405180910390f35b34610000576100896100f4565b6040518082815260200191505060405180910390f35b34610000576100ac6100fa565b6040518082815260200191505060405180910390f35b6100d86004808035906020019091905050610100565b6040518082815260200191505060405180910390f35b60035481565b60025481565b60015481565b600060015460035414806101615750600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1561016b57610000565b600154826003540110151561024357600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600354600154039081150290604051809050600060405180830381858888f1935050505015156101e557610000565b3373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f1935050505050600154600381905550610304565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051809050600060405180830381858888f1935050505015156102a857610000565b3373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f193505050505081600354016003819055505b60035490505b91905056', 
		gas: '4700000'
	}, function (e, contract){
		console.log(e, 'contarct build');
		if (typeof contract.address !== 'undefined') {
			res.json({
				'state':'Contract mined!',
				'contract address': contract.address,
				' transactionHash': contract.transactionHash
			});
		}
	});
});

module.exports = router;
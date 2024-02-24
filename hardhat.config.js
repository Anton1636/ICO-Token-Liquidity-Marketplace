require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

module.exports = {
	solidity: '0.8.17',
	defaultNetwork: 'matic',
	networks: {
		hardhat: {},
		polygon_mumbai: {
			url: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
			accounts: [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`],
		},
	},
}

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import factoryAbi from './factoryAbi.json'
import ERC20ABI from './abi.json'
import Woox from './Woox.json'
import ICOWoox from './ICOWoox.json'
import Liquidity from './Liquidity.json'

export const Woox_ADDRESS = '0xef332eb92eab094be3f3f7c2ef3ff27ab219ca80'
export const Woox_ABI = Woox.abi

export const ICOWoox_ADDRESS = '0x876aff7e2ed3efbe67af03290670eca620b93fc9'
export const ICOWoox_ABI = ICOWoox.abi

export const Liquidity_ADDRESS = '0xc95a892c798e09ee28dc1bb7fdaf82fd6fee31a9'
export const Liquidity_ABI = Liquidity.abi

export const FACTORY_ABI = factoryAbi
export const FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f26734ea31F984'
export const positionManagerAddress =
	'0xC36442b4a4522E871399CD717aBDD847Ab11FE88'

const fetchContract = (signer, ABI, ADDRESS) =>
	new ethers.Contract(ADDRESS, ABI, signer)

export const web3Provider = async () => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)

		return provider
	} catch (e) {
		console.log(e)
	}
}

export const CONNECTING_CONTRACT = async ADDRESS => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const network = await provider.getNetwork()
		const signer = provider.getSigner()
		const contract = fetchContract(signer, ERC20ABI, ADDRESS)
		const userAddress = signer.getAddress()
		const balance = await contract.balanceOf(userAddress)
		const name = await contract.name()
		const symbol = await contract.symbol()
		const supply = await contract.totalSupply()
		const decimals = await contract.decimals()
		const address = await contract.address

		const token = {
			address: address,
			name: name,
			symbol: symbol,
			decimals: decimals,
			supply: ethers.utils.formatEther(supply.toString()),
			balance: ethers.utils.formatEther(balance.toString()),
			chainId: network.chainId,
		}

		return token
	} catch (e) {
		console.log(e)
	}
}

export const internalWooxContract = async () => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const contract = fetchContract(provider, Woox_ABI, Woox_ADDRESS)

		return contract
	} catch (e) {
		console.log(e)
	}
}

export const internalICOWooxContract = async () => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const contract = fetchContract(provider, ICOWoox_ABI, ICOWoox_ADDRESS)

		return contract
	} catch (e) {
		console.log(e)
	}
}

export const internalAddLiquidityContract = async () => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const contract = fetchContract(provider, Liquidity_ABI, Liquidity_ADDRESS)

		return contract
	} catch (e) {
		console.log(e)
	}
}

export const getBalance = async () => {
	try {
		const web3modal = new Web3Modal()
		const connection = await web3modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

		return await signer.getBalance()
	} catch (e) {
		console.log(e)
	}
}

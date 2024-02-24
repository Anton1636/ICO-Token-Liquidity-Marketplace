import React, { useState, useEffect } from 'react'
import { ethers, Contract } from 'ethers'
import Web3Modal from 'web3modal'
import axios from 'axios'
import UniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
import toast from 'react-hot-toast'
import { Token } from '@uniswap/sdk-core'
import { Pool, Position, nearestUsableTick } from '@uniswap/v3-sdk'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { abi as INonfungiblePositionManagerABI } from '@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json'
import ERC20ABI from './abi.json'
import {
	ERC20_ABI,
	TOKEN_ABI,
	V3_SWAP_ROUTER_ADDRESS,
	CONNECTING_CONTRACT,
	FACTORY_ABI,
	FACTORY_ADDRESS,
	web3Provider,
	positionManagerAddress,
	internalWooxContract,
	internalICOWooxContract,
	internalAddLiquidity,
	getBalance,
} from './constants'
import { parseErrorMsg } from '../utils/index'

export const CONTEXT = React.createContext()

export const CONTEXT_Provider = ({ children }) => {
	const DAPP_NAME = 'Liquidity Dapp'
	const [loader, setLoader] = useState(false)
	const [address, setAddress] = useState('')
	const [chainID, setChainID] = useState()
	const [balance, setBalance] = useState()
	const [nativeToken, setNativeToken] = useState()
	const [tokenHolders, setTokenHolders] = useState([])
	const [tokenSale, setTokenSale] = useState()
	const [currentHolder, setCurrentHolder] = useState()

	const notifyError = msg => toast.error(msg, { duration: 4000 })
	const notifySuccess = msg => toast.success(msg, { duration: 4000 })

	const connect = async () => {
		try {
			if (!window.ethereum) return notifyError('Install MetaMask')

			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			})

			if (accounts.length) {
				setAddress(accounts[0])
			} else {
				notifyError('Sorry, you have no account')
			}

			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			setChainID(network.chainId)
		} catch (e) {
			const errorMsg = parseErrorMsg(e)
			notifyError(errorMsg)
			console.log(e)
		}
	}

	const checkIfWalletConnected = async () => {
		const accounts = await window.ethereum.request({ method: 'eth_accounts' })
		return accounts[0]
	}

	const LOAD_TOKEN = async token => {
		try {
			const tokenDetail = await CONNECTING_CONTRACT(token)
			return tokenDetail
		} catch (e) {
			console.log(e)
		}
	}

	const GET_POOL_ADDRESS = async (token_1, token_2, fee) => {
		try {
			setLoader(true)
			const PROVIDER = await web3Provider()
			const factoryContract = new ethers.Contract(
				FACTORY_ADDRESS,
				FACTORY_ABI,
				PROVIDER
			)

			const poolAddress = await factoryContract.functions.getPool(
				token_1.address,
				token_2.address,
				Number(fee)
			)

			const poolHistory = {
				token_A: token_1,
				token_B: token_2,
				fee: fee,
				network: token_1.chainId,
				poolAddress: poolAddress,
			}

			const zeroAdd = '0x00000000000000000000000000000000000000000'

			if (poolAddress == zeroAdd) {
				notifySuccess('Sorry there is no pool')
			} else {
				let poolArray = []
				const poolLists = localStorage.getItem('poolHistory')
				if (poolLists) {
					poolArray = JSON.parse(localStorage.getItem('poolHistory'))
					poolArray.push(poolHistory)
					localStorage.setItem('poolHistory', JSON.stringify(poolArray))
				} else {
					poolArray.push(poolHistory)
					localStorage.setItem('poolHistory', JSON.stringify(poolArray))
				}
				setLoader(false)
				notifySuccess('Successfully Completed')
			}

			return poolAddress
		} catch (e) {
			const errorMsg = parseErrorMsg(e)
			setLoader(false)
			notifyError(errorMsg)
		}
	}

	async function getPoolData(poolContract) {
		const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
			poolContract.tickSpacing(),
			poolContract.fee(),
			poolContract.liquidity(),
			poolContract.slot0(),
		])

		return {
			tickSpacing: tickSpacing,
			fee: fee,
			liquidity: liquidity,
			sqrtPriceX96: slot0[0],
			tick: slot0[1],
		}
	}

	const CREATE_LIQUIDITY = async (pool, liquidityAmount, approveAmount) => {
		try {
			setLoader(true)
			const address = await checkIfWalletConnected()
			const PROVIDER = await web3Provider()
			const signer = PROVIDER.getSigner()

			const TOKEN_1 = new Token(
				pool.token_A.chainId,
				pool.token_A.address,
				pool.token_A.decimals,
				pool.token_A.symbol,
				pool.token_A.name
			)

			const TOKEN_2 = new Token(
				pool.token_B.chainId,
				pool.token_B.address,
				pool.token_B.decimals,
				pool.token_B.symbol,
				pool.token_B.name
			)

			const poolAddress = pool.poolAddress[0]
			const nonfungiblePositionManagerContract = new ethers.Contract(
				positionManagerAddress,
				INonfungiblePositionManagerABI,
				PROVIDER
			)
			const poolContract = new ethers.Contract(
				poolAddress,
				IUniswapV3PoolABI,
				PROVIDER
			)
			const poolData = await getPoolData(poolContract)
			const TOKEN_1TOKEN_2_POOL = new Pool(
				TOKEN_1,
				TOKEN_2,
				poolData.fee,
				poolData.sqrtPriceX96.toString(),
				poolData.liquidity.toString(),
				poolData.tick
			)
			const position = new Position({
				pool: TOKEN_1TOKEN_2_POOL,
				liquidity: ethers.utils.parseUnits(liquidityAmount, 18),
				tickLower:
					nearestUsableTick(poolData.tick, poolData.tickSpacing) -
					poolData.tickSpacing * 2,
				tickUpper:
					nearestUsableTick(poolData.tick, poolData.tickSpacing) +
					poolData.tickSpacing * 2,
			})

			const approvalAmount = ethers.utils
				.parseUnits(approveAmount, 18)
				.toString()
			const tokenContract0 = new ethers.Contract(
				pool.token_A.address,
				ERC20ABI,
				PROVIDER
			)

			await tokenContract0
				.connect(signer)
				.approve(positionManagerAddress, approvalAmount)

			const tokenContract1 = new ethers.Contract(
				pool.token_B.address,
				ERC20ABI,
				PROVIDER
			)

			await tokenContract1
				.connect(signer)
				.approve(positionManagerAddress, approvalAmount)

			const { amount0: amount0Desired, amount1: amount1Desired } =
				position.mintAmounts

			const params = {
				token0: pool.token_A.address,
				token1: pool.token_B.address,
				fee: poolData.fee,
				tickLower:
					nearestUsableTick(poolData.tick, poolData.tickSpacing) -
					poolData.tickSpacing * 2,
				tickUpper:
					nearestUsableTick(poolData.tick, poolData.tickSpacing) +
					poolData.tickSpacing * 2,
				amount0Desired: amount0Desired.toString(),
				amount1Desired: amount1Desired.toString(),
				amount0Min: amount0Desired.toString(),
				amount1Min: amount1Desired.toString(),
				recipient: address,
				deadline: Math.floor(Date.nom() / 1000) + 60 * 10,
			}

			const transactionHash = await nonfungiblePositionManagerContract
				.connect(signer)
				.mint(params, { gasLimit: ethers.utils.hexlify(1000000) })
				.then(res => {
					return res.hash
				})

			if (transactionHash) {
				const liquidityContract = await internalAddLiquidity()
				const addLiquidityData = await liquidityContract
					.connect(signer)
					.addLiquidity(
						pool.token_A.name,
						pool.token_B.name,
						pool.token_A.address,
						pool.token_B.address,
						poolAddress,
						pool.token_B.chainId.toString(),
						transactionHash
					)
				await addLiquidityData.wait()

				setLoader(false)
				notifySuccess('Liquidity add Successfully')
				window.location.reload()
			}
		} catch (error) {
			const errorMsg = parseErrorMsg(error)
			setLoader(false)
			notifyError(errorMsg)
		}
	}

	const fetchInitialData = async () => {
		try {
			const account = await checkIfWalletConnected()
			const balance = await getBalance()

			setBalance(ethers.utils.formatEther(balance.toString()))
			setAddress(account)

			const WOOX_TOKEN_CONTRACT = await internalWooxContract()
			let tokenBalance

			if (account) {
				tokenBalance = await WOOX_TOKEN_CONTRACT.balanceOf(account)
			} else {
				tokenBalance = 0
			}

			const tokenName = await WOOX_TOKEN_CONTRACT.name()
			const tokenSymbol = await WOOX_TOKEN_CONTRACT.symbol()
			const tokenTotalSupply = await WOOX_TOKEN_CONTRACT.totalSupply()
			const tokenStandard = await WOOX_TOKEN_CONTRACT.standard()
			const tokenHolders = await WOOX_TOKEN_CONTRACT._userId()
			const tokenOwnerOfContract = await WOOX_TOKEN_CONTRACT.ownerOfContract()
			const tokenAddress = await WOOX_TOKEN_CONTRACT.address

			const nativeToken = {
				tokenAddress: tokenAddress,
				tokenName: tokenName,
				tokenSymbol: tokenSymbol,
				tokenOwnerOfContract: tokenOwnerOfContract,
				tokenStandard: tokenStandard,
				tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
				tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
				tokenHolders: tokenHolders.toNumber(),
			}

			setNativeToken(nativeToken)

			const getTokenHolder = await WOOX_TOKEN_CONTRACT.getTokenHolder()
			setTokenHolders(getTokenHolder)

			if (account) {
				const getTokenHolderData = await WOOX_TOKEN_CONTRACT.getTokenHolderData(
					account
				)

				const currentHolder = {
					tokenId: getTokenHolderData[0].toNumber(),
					from: getTokenHolderData[1],
					to: getTokenHolderData[2],
					totalToken: ethers.utils.formatEther(
						getTokenHolderData[3].toString()
					),
					tokenHolder: getTokenHolderData[4],
				}
				setCurrentHolder(currentHolder)
			}

			const ICO_WOOX_CONTRACT = await internalICOWooxContract()
			const tokenPrice = await ICO_WOOX_CONTRACT.tokenPrice()
			const tokenSold = await ICO_WOOX_CONTRACT.tokensSold()
			const tokenSaleBalance = await WOOX_TOKEN_CONTRACT.balanceOf(
				'0xef332eb92eab094be3f3f7c2ef3ff27ab219ca80'
			)

			const tokenSale = {
				tokenSold: tokenSold.toNumber(),
				tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
			}

			setTokenSale(tokenSale)
			console.log(tokenSale)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchInitialData()
	}, [])

	const buyToken = async nToken => {
		try {
			setLoader(true)

			const PROVIDER = await web3Provider()
			const signer = PROVIDER.getSigner()
			const contract = await internalICOWooxContract()

			console.log(contract)

			const price = 0.0001 * nToken
			const amount = ethers.utils.parseUnits(price.toString(), 'ether')
			const buying = await contract.connect(signer).buyTokens(nToken, {
				value: amount.toString(),
				gasLimit: ethers.utils.hexlify(1000000),
			})

			await buying.wait()
			window.location.reload()
		} catch (e) {
			const errorMsg = parseErrorMsg(e)
			console.log(e)
			setLoader(errorMsg)
		}
	}

	const transferNativeToken = async () => {
		try {
			setLoader(true)
			const PROVIDER = await web3Provider()
			const signer = PROVIDER.getSigner()
			const TOKEN_SALE_ADDRESS = '0xef332eb92eab094be3f3f7c2ef3ff27ab219ca80'
			const TOKEN_AMOUNT = 2000
			const tokens = TOKEN_AMOUNT.toString()
			const transferAmount = ethers.utils.parseEther(tokens)
			const contract = await internalWooxContract()
			const transaction = await contract
				.connect(signer)
				.transfer(TOKEN_SALE_ADDRESS, transferAmount)

			await transaction.wait()

			window.location.reload()
		} catch (e) {
			const errorMsg = parseErrorMsg(e)
			setLoader(false)
			notifyError(errorMsg)
		}
	}

	const GET_ALL_LIQUIDITY = async () => {
		try {
			const account = await checkIfWalletConnected()
			const contract = await internalAddLiquidity()
			const liquidityHistory = await contract.getAllLiquidity(account)

			const Allliquidity = liquidityHistory.map(liquidity => {
				const liquidityArray = {
					id: liquidity.id.toNumber(),
					network: liquidity.network,
					owner: liquidity.owner,
					poolAddress: liquidity.poolAddress,
					tokenA: liquidity.tokenA,
					tokenB: liquidity.tokenB,
					tokenA_Address: liquidity.tokenA_Address,
					tokenB_Address: liquidity.tokenB_Address,
					timeCreated: liquidity.timeCreated.toNumber(),
					transactionHash: liquidity.transactionHash,
				}
				return liquidityArray
			})
			return Allliquidity
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<CONTEXT.Provider
			value={{
				connect,
				GET_POOL_ADDRESS,
				LOAD_TOKEN,
				notifyError,
				notifySuccess,
				CREATE_LIQUIDITY,
				GET_ALL_LIQUIDITY,
				transferNativeToken,
				buyToken,
				tokenSale,
				nativeToken,
				address,
				loader,
				DAPP_NAME,
			}}
		>
			{children}
		</CONTEXT.Provider>
	)
}

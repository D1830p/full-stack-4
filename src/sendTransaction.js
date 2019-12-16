import { ethers } from 'ethers'
import { DONATION_ADDRESS } from './constants'

const NETWORK = 'goerli'

export default async function sendTransaction({ valueInEth, gas, message }) {
  const accounts = await window.ethereum.enable()
  console.log('Accounts found:', accounts)

  const provider = ethers.getDefaultProvider(NETWORK)
  const gasPrice = await provider.getGasPrice()

  const transactionParameters = {
    to: DONATION_ADDRESS,
    from: accounts[0],
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: valueInEth
      ? ethers.utils.parseEther(valueInEth).toHexString()
      : undefined,
    data: ethers.utils.formatBytes32String(message)
  }

  console.log('Sending transaction with params:', transactionParameters)
  const response = await window.ethereum.send('eth_sendTransaction', [
    transactionParameters,
  ])

  console.log(
    `Sent ${ message } transaction: https://${NETWORK}.etherscan.io/tx/${response.result}`,
  )
}

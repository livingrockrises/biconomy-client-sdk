import { JsonRpcProvider } from '@ethersproject/providers'

// import { EntryPoint__factory } from '@account-abstraction/contracts'

import { EntryPointFactoryContractV101 } from '@biconomy-sdk-dev/ethers-lib'

import { ClientConfig } from './ClientConfig'
import { SmartAccountAPI } from './SmartAccountAPI'
import { ERC4337EthersProvider } from './ERC4337EthersProvider'
import { HttpRpcClient } from './HttpRpcClient'
import { Signer } from '@ethersproject/abstract-signer'

// To be used in SmartAccount to init 4337 provider
export async function newProvider(
  originalProvider: JsonRpcProvider,
  config: ClientConfig,
  originalSigner: Signer = originalProvider.getSigner(),
  walletAddress: string,
  fallbackHandlerAddress: string,
  factoryAddress: string
): Promise<ERC4337EthersProvider> {
  const entryPoint = EntryPointFactoryContractV101.connect(
    config.entryPointAddress,
    originalProvider
  )
  // Initial SimpleWallet instance is not deployed and exists just for the interface
  // const simpleWalletDeployer = await DeterministicDeployer.deploy(SimpleWalletDeployer__factory.bytecode)
  const smartWalletAPI = new SmartAccountAPI(
    originalProvider,
    entryPoint,
    config,
    walletAddress,
    originalSigner,
    fallbackHandlerAddress,
    factoryAddress,
    0
  )
  const httpRpcClient = new HttpRpcClient(
    config.bundlerUrl,
    config.entryPointAddress,
    config.chainId,
    config.dappAPIKey
  )
  const ethProvider = await new ERC4337EthersProvider(
    config,
    originalSigner,
    originalProvider,
    httpRpcClient,
    entryPoint,
    smartWalletAPI
  ).init()
  console.log('initialisation completed in provider')
  return ethProvider
}

import { SmartWalletContractV100__factory as SmartWalletContractV100 } from '../../typechain/src/ethers-v5/v1.0.0/factories/SmartWalletContractV100__factory'
import { SmartWalletContractV101__factory as SmartWalletContractV101 } from '../../typechain/src/ethers-v5/v1.0.1/factories/SmartWalletContractV101__factory'

import { MultiSendContractV100__factory as MultiSendContractV100 } from '../../typechain/src/ethers-v5/v1.0.0/factories/MultiSendContractV100__factory'
import { MultiSendContractV101__factory as MultiSendContractV101 } from '../../typechain/src/ethers-v5/v1.0.1/factories/MultiSendContractV101__factory'

import { MultiSendCallOnlyContractV100__factory as MultiSendCallOnlyContractV100 } from '../../typechain/src/ethers-v5/v1.0.0/factories/MultiSendCallOnlyContractV100__factory'
import { MultiSendCallOnlyContractV101__factory as MultiSendCallOnlyContractV101 } from '../../typechain/src/ethers-v5/v1.0.1/factories/MultiSendCallOnlyContractV101__factory'

import { SmartWalletFactoryContractV100__factory as SmartWalletFactoryFactoryContractV100 } from '../../typechain/src/ethers-v5/v1.0.0/factories/SmartWalletFactoryContractV100__factory'
import { SmartWalletFactoryContractV101__factory as SmartWalletFactoryFactoryContractV101 } from '../../typechain/src/ethers-v5/v1.0.1/factories/SmartWalletFactoryContractV101__factory'

import SmartWalletContractEthers_v1_0_0 from './SmartWallet/v1.0.0/SmartWalletContractEthers'
import SmartWalletContractEthers_v1_0_1 from './SmartWallet/v1.0.1/SmartWalletContractEthers'

import MultiSendEthersContract_v1_0_0 from './MultiSend/v1.0.0/MultiSendEthersContract'
import MultiSendEthersContract_v1_0_1 from './MultiSend/v1.0.1/MultiSendEthersContract'

import MultiSendCallOnlyEthersContract_v1_0_0 from './MultiSendCallOnly/v1.0.0/MultiSendCallOnlyEthersContract'
import MultiSendCallOnlyEthersContract_v1_0_1 from './MultiSendCallOnly/v1.0.1/MultiSendCallOnlyEthersContract'

import SmartWalletFacoryContractEthers_v1_0_0 from './SmartWalletFactory/v1.0.0/SmartWalletProxyFactoryEthersContract'
import SmartWalletFacoryContractEthers_v1_0_1 from './SmartWalletFactory/v1.0.1/SmartWalletProxyFactoryEthersContract'

import { EntryPointContractV100__factory as EntryPointFactoryContractV100 } from '../../typechain/src/ethers-v5/v1.0.0/factories/EntryPointContractV100__factory'
import { EntryPointContractV101__factory as EntryPointFactoryContractV101 } from '../../typechain/src/ethers-v5/v1.0.1/factories/EntryPointContractV101__factory'

import EntryPointEthersContract_v1_0_0 from './EntryPointContract/v1.0.0/EntryPointEthersContract'
import EntryPointEthersContract_v1_0_1 from './EntryPointContract/v1.0.1/EntryPointEthersContract'

import { JsonRpcProvider } from '@ethersproject/providers'
import { SmartAccountVersion } from '@biconomy-sdk-dev/core-types'

export function getSmartWalletContractInstance(
  smartAccountVersion: SmartAccountVersion,
  contractAddress: string,
  // signer: Signer
  provider: JsonRpcProvider
): SmartWalletContractEthers_v1_0_0 | SmartWalletContractEthers_v1_0_1 {
  let walletContract
  switch (smartAccountVersion) {
    case '1.0.0':
      walletContract = SmartWalletContractV100.connect(contractAddress, provider)
      return new SmartWalletContractEthers_v1_0_0(walletContract)
    case '1.0.1':
      walletContract = SmartWalletContractV101.connect(contractAddress, provider)
      return new SmartWalletContractEthers_v1_0_1(walletContract)
  }
}

// Review
export function getMultiSendContractInstance(
  smartAccountVersion: SmartAccountVersion,
  contractAddress: string,
  // signer: Signer
  provider: JsonRpcProvider
): MultiSendEthersContract_v1_0_0 | MultiSendEthersContract_v1_0_1 {
  let multiSendContract

  switch (smartAccountVersion) {
    case '1.0.0':
      multiSendContract = MultiSendContractV100.connect(contractAddress, provider)
      return new MultiSendEthersContract_v1_0_0(multiSendContract)
    case '1.0.1':
      multiSendContract = MultiSendContractV101.connect(contractAddress, provider)
      return new MultiSendEthersContract_v1_0_1(multiSendContract)
  }
}

export function getMultiSendCallOnlyContractInstance(
  smartAccountVersion: SmartAccountVersion,
  contractAddress: string,
  // signer: Signer
  provider: JsonRpcProvider
): MultiSendCallOnlyEthersContract_v1_0_0 | MultiSendCallOnlyEthersContract_v1_0_1 {
  let multiSendCallContract

  switch (smartAccountVersion) {
    case '1.0.0':
      multiSendCallContract = MultiSendCallOnlyContractV100.connect(contractAddress, provider)
      return new MultiSendCallOnlyEthersContract_v1_0_0(multiSendCallContract)
    case '1.0.1':
      multiSendCallContract = MultiSendCallOnlyContractV101.connect(contractAddress, provider)
      return new MultiSendCallOnlyEthersContract_v1_0_1(multiSendCallContract)
  }
}

export function getSmartWalletFactoryContractInstance(
  smartAccountVersion: SmartAccountVersion,
  contractAddress: string,
  provider: JsonRpcProvider
): SmartWalletFacoryContractEthers_v1_0_0 | SmartWalletFacoryContractEthers_v1_0_1 {
  let walletFactoryContract

  switch (smartAccountVersion) {
    case '1.0.0':
      walletFactoryContract = SmartWalletFactoryFactoryContractV100.connect(
        contractAddress,
        provider
      )
      return new SmartWalletFacoryContractEthers_v1_0_0(walletFactoryContract)
    case '1.0.1':
      walletFactoryContract = SmartWalletFactoryFactoryContractV101.connect(
        contractAddress,
        provider
      )
      return new SmartWalletFacoryContractEthers_v1_0_1(walletFactoryContract)
  }
}

export function getEntryPointFactoryContractInstance(
  smartAccountVersion: SmartAccountVersion,
  contractAddress: string,
  provider: JsonRpcProvider
): EntryPointEthersContract_v1_0_0 | EntryPointEthersContract_v1_0_1 {
  let walletFactoryContract

  switch (smartAccountVersion) {
    case '1.0.0':
      walletFactoryContract = EntryPointFactoryContractV100.connect(contractAddress, provider)
      return new EntryPointEthersContract_v1_0_0(walletFactoryContract)
    case '1.0.1':
      walletFactoryContract = EntryPointFactoryContractV101.connect(contractAddress, provider)
      return new EntryPointEthersContract_v1_0_1(walletFactoryContract)
  }
}

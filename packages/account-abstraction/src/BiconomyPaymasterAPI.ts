import { resolveProperties } from '@ethersproject/properties'
import { UserOperation } from '@biconomy-sdk-dev/core-types'
import { HttpMethod, sendRequest } from './utils/httpRequests'
import { IPaymasterAPI } from '@biconomy-sdk-dev/core-types'

/**
 * Verifying Paymaster API supported via Biconomy dahsboard to enable Gasless transactions
 */
export class BiconomyPaymasterAPI implements IPaymasterAPI {
  constructor(readonly signingServiceUrl: string, readonly dappAPIKey: string) {
    this.signingServiceUrl = signingServiceUrl
    this.dappAPIKey = dappAPIKey
  }

  async getPaymasterAndData(userOp: Partial<UserOperation>): Promise<string> {
    try {
      if (!this.dappAPIKey || this.dappAPIKey === '') {
        return '0x'
      }

      userOp = await resolveProperties(userOp)
      userOp.nonce = Number(userOp.nonce)
      userOp.callGasLimit = Number(userOp.callGasLimit)
      userOp.verificationGasLimit = Number(userOp.verificationGasLimit)
      userOp.maxFeePerGas = Number(userOp.maxFeePerGas)
      userOp.maxPriorityFeePerGas = Number(userOp.maxPriorityFeePerGas)
      userOp.preVerificationGas = 21000
      userOp.signature = '0x'
      userOp.paymasterAndData = '0x'

      // move dappAPIKey in headers
      const result: any = await sendRequest({
        url: `${this.signingServiceUrl}`,
        method: HttpMethod.Post,
        headers: { 'x-api-key': this.dappAPIKey },
        body: { userOp: userOp }
      })

      console.log('******** ||||| *********')
      console.log('verifying and signing service response', result)

      if (result && result.data && result.code === 200) {
        return result.data.paymasterAndData
      } else {
        console.log('error in verifying. sending paymasterAndData 0x')
        console.log(result.error)
      }
    } catch (err) {
      console.log('error in signing service response')
      console.error(err)
      return '0x'
    }
    return '0x'
  }
}

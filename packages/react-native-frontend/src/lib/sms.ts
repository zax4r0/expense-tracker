import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from 'react-native'

const { RNExpoReadSms } = NativeModules

export default RNExpoReadSms

const requestSMSPermissions = async (): Promise<{
  hasReceiveSmsPermission: boolean
  hasReadSmsPermission: boolean
}> => {
  const receiveSmsPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS)
  const readSmsPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)

  console.info(receiveSmsPermission)

  return {
    hasReceiveSmsPermission: receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED,
    hasReadSmsPermission: readSmsPermission === PermissionsAndroid.RESULTS.GRANTED
  }
}

export async function startReadSMS(
  callback: (status: string, sms: string, error?: string) => void,
  callbackFn2?: (status: string, sms: string, error?: string) => void
): Promise<void> {
  const resultFun = (status: string, sms: string, error?: string) => {
    if (callback) {
      callback(status, sms, error)
    }
    if (callbackFn2) {
      callbackFn2(status, sms, error)
    }
  }

  if (Platform.OS === 'android') {
    try {
      let hasPermission = await checkIfHasSMSPermission()
      console.log('hasPermission', hasPermission)
      hasPermission = await requestSMSPermissions()

      if (!hasPermission) {
        hasPermission = await requestSMSPermissions()
        console.log('Permissions requested', hasPermission)
      }

      if (typeof hasPermission === 'boolean' && hasPermission) {
        RNExpoReadSms.startReadSMS(
          () => {
            new NativeEventEmitter(RNExpoReadSms).addListener('received_sms', (sms: string) => {
              resultFun('success', sms)
            })
          },
          (error: string) => {
            resultFun('error', '', error)
          }
        )
      } else if (
        typeof hasPermission === 'object' &&
        hasPermission.hasReadSmsPermission &&
        hasPermission.hasReceiveSmsPermission
      ) {
        RNExpoReadSms.startReadSMS(
          () => {
            new NativeEventEmitter(RNExpoReadSms).addListener('received_sms', (sms: string) => {
              resultFun('success', sms)
            })
          },
          (error: string) => {
            resultFun('error', '', error)
          }
        )
      } else {
        resultFun('error', '', 'Required RECEIVE_SMS and READ_SMS permission')
      }
    } catch (error) {
      console.error('Error checking SMS permissions:', error)
      resultFun('error', '', 'An error occurred while checking permissions')
    }
  }
}

export const checkIfHasSMSPermission = async (): Promise<
  boolean | { hasReceiveSmsPermission: boolean; hasReadSmsPermission: boolean }
> => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true
  }

  const hasReceiveSmsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS)
  const hasReadSmsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS)

  if (hasReceiveSmsPermission && hasReadSmsPermission) return true

  return {
    hasReceiveSmsPermission,
    hasReadSmsPermission
  }
}

export async function requestReadSMSPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    const hasPermission = await checkIfHasSMSPermission()
    if (typeof hasPermission === 'boolean' && hasPermission) return true
    if (typeof hasPermission === 'object' && hasPermission.hasReadSmsPermission && hasPermission.hasReceiveSmsPermission)
      return true

    const status = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS
    ])

    if (
      status[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.GRANTED &&
      status[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true
    }

    if (
      status[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.DENIED ||
      status[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.DENIED
    ) {
      console.log('Read Sms permission denied by user.', status)
    } else if (
      status[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      status[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      console.log('Read Sms permission revoked by user.', status)
    }

    return false
  }

  return true
}

export function stopReadSMS(): void {
  if (Platform.OS === 'android') {
    RNExpoReadSms.stopReadSMS()
  }
}

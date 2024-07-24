import React from 'react'
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native'
import { requestReadSMSPermission, startReadSMS } from '@/lib/sms'
import { useEffect, useState } from 'react'

const useApp = () => {
  const [appState, setAppState] = useState<string | null>(null)
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState<boolean | null>(null)
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState<boolean | null>(null)
  const [smsPermissionState, setSmsPermissionState] = useState<string | null>(null)
  const [successCallbackStatus, setSuccessCallbackStatus] = useState<string | null>(null)
  const [errorCallbackStatus, setErrorCallbackStatus] = useState<string | null>(null)
  const [smsMessageData, setSmsMessageData] = useState<string | null>(null)
  const [smsMessageNumber, setSmsMessageNumber] = useState<string | null>(null)
  const [smsMessageBody, setSmsMessageBody] = useState<string | null>(null)
  const [smsError, setSMSError] = useState<string | null>(null)

  const buttonClickHandler = () => {
    try {
      startReadSMS(callbackFn1, callbackFn2)
    }catch (error){
      console.error(error)
    }

  }

  const callbackFn1 = (status: string, sms: string, error?: string) => {
    setSmsPermissionState('Success Callback!')

    if (status === 'Start Read SMS successfully') {
      setSuccessCallbackStatus('Start Read SMS successfully')
      setSmsMessageData(sms)
    } else if (status === 'success') {
      setSuccessCallbackStatus('just success')
      setSmsMessageData(sms)
    } else {
      setSuccessCallbackStatus('Error in success callback')
      setSMSError(error || 'Unknown error')
    }
  }

  const callbackFn2 = (status: string, sms: string, error?: string) => {
    setSmsPermissionState('Error Callback!')
    setErrorCallbackStatus('Start Read SMS failed')
  }

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const customHasReceiveSMSPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS)
      const customHasReadSMSPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS)

      setHasReceiveSMSPermission(customHasReceiveSMSPermission)
      setHasReadSMSPermission(customHasReadSMSPermission)
      setAppState('Permission check complete')
    }
  }

  useEffect(() => {
    if (smsMessageData) {
      const tempArray = smsMessageData.substring(1, smsMessageData.length - 1).split(',')
      const messageOriginatingAdd = tempArray[0]
      const messageBody = tempArray[1]

      setSmsMessageBody(messageBody)
      setSmsMessageNumber(messageOriginatingAdd)
    } else {
      setSmsMessageBody(null)
      setSmsMessageNumber(null)
    }
  }, [smsMessageData])

  useEffect(() => {
    console.log('requestReadSMSPermission:', requestReadSMSPermission)
    setAppState('init')
    checkPermissions()
  }, [])

  return {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsMessageBody,
    smsMessageNumber,
    smsError
  }
}

const SMSComponent: React.FC = () => {
  const {
    appState,
    buttonClickHandler,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsMessageBody,
    smsMessageNumber,
    smsError
  } = useApp()

  return (
    <View>
      <Text>App State: {appState}</Text>
      <Button title="Start Reading SMS" onPress={buttonClickHandler} />
      <Text>Receive SMS Permission: {hasReceiveSMSPermission ? 'Granted' : 'Denied'}</Text>
      <Text>Read SMS Permission: {hasReadSMSPermission ? 'Granted' : 'Denied'}</Text>
      <Text>SMS Permission State: {smsPermissionState}</Text>
      <Text>Success Callback Status: {successCallbackStatus}</Text>
      <Text>Error Callback Status: {errorCallbackStatus}</Text>
      {smsMessageNumber && <Text>SMS Number: {smsMessageNumber}</Text>}
      {smsMessageBody && <Text>SMS Body: {smsMessageBody}</Text>}
      {smsError && <Text>Error: {smsError}</Text>}
    </View>
  )
}

export default SMSComponent

import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '@/components/ui/Themed'
import SMSComponent from '@/components/Sms'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <SMSComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

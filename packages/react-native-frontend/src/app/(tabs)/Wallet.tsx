import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/ui/Themed'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
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

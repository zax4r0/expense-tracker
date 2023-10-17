import Colors, { appColors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { StatusBar, View, Text, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const { height } = Dimensions.get('window')
const totalBalanceSectionHeight = height * 0.2

interface Bank {
  name: string
  balance: number
  image?: string
}

export default function Home() {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const [banks, setBanks] = useState<Bank[]>([
    { name: 'HDFC', balance: 10000, image: 'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png' },
    { name: 'BOB', balance: 5500, image: 'https://1000logos.net/wp-content/uploads/2021/06/Bank-of-Baroda-icon.png' },
    { name: 'Test', balance: 100 }
  ])

  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    const total = banks.reduce((total, bank) => total + bank.balance, 0)
    setTotalBalance(total)
  }, [banks])

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={appColors.appMain} />
      <View
        style={{
          height: totalBalanceSectionHeight,
          backgroundColor: appColors.appMain,
          borderRadius: 10,
          justifyContent: 'center',
          paddingLeft: 20,
          shadowColor: isDarkMode ? '#FFF' : '#000', // Adjust shadow color based on theme
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          marginBottom: 20
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total Balance: ₹{totalBalance.toLocaleString()}</Text>
      </View>
      <FlatList
        data={banks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
              padding: 15,
              borderRadius: 10,
              shadowColor: isDarkMode ? '#292929' : '#000', // Adjust shadow color based on theme
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              backgroundColor: Colors[colorScheme ?? 'dark'].secondaryBackground
            }}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: Colors[colorScheme ?? 'dark'].secondaryBackground,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15
                }}
              >
                <FontAwesome name="bank" size={30} />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme ?? 'dark'].text }}>{item.name}</Text>
              <Text style={{ fontSize: 16, marginTop: 5, color: Colors[colorScheme ?? 'dark'].text }}>
                ₹ {item.balance.toLocaleString('en-IN')}
              </Text>
            </View>
            <TouchableOpacity style={{ padding: 5, borderRadius: 25, borderColor: appColors.appMain, borderWidth: 0 }}>
              <FontAwesome name="refresh" size={24} color={appColors.appMain} />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

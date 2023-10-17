import Colors from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable, useColorScheme, Image, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'

function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />
}

const USER_IMAGE = 'https://avatars.githubusercontent.com/u/76214239?v=4'

const UserImageComponent = () => {
  const colorScheme = useColorScheme()
  const { text } = Colors[colorScheme ?? 'light']

  const renderContent = (pressed: boolean) => {
    if (USER_IMAGE) {
      return (
        <Image
          source={{ uri: USER_IMAGE }}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1, width: 35, height: 35, borderRadius: 25 }}
        />
      )
    }
    return <FontAwesome name="user-circle" size={25} color={text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
  }

  return (
    <Pressable>
      {({ pressed }) => (
        <Link href="/modal/">
          <View style={{ marginRight: 15 }}>{renderContent(pressed)}</View>
        </Link>
      )}
    </Pressable>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Balance',
          headerTitle: 'Balance',
          tabBarIcon: ({ color }) => <TabBarIcon name="bank" color={color} />,
          headerRight: () => <UserImageComponent />
        }}
      />
      <Tabs.Screen
        name="Wallet"
        options={{
          tabBarLabel: 'Wallet',
          headerTitle: 'Exprence',
          tabBarIcon: ({ color }) => <TabBarIcon name="piechart" color={color} />
        }}
      />
      <Tabs.Screen
        name="Test"
        options={{
          title: 'Test',
          tabBarIcon: ({ color }) => <TabBarIcon name="creditcard" color={color} />,
          headerRight: () => <UserImageComponent />
        }}
      />
    </Tabs>
  )
}

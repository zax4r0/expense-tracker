import React, { useState } from 'react'
import { StyleSheet, TextInput, Button } from 'react-native'
import { Text, View } from '@/components/ui/Themed'
import { useGetJokeQuery } from '@/data/client/test'
import { LoadingIndicator } from '@/components/ui/LoadingIndicator'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

import { useForm, Controller } from 'react-hook-form'
import JokeDisplay from '@/components/JokeDisplay'
import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { onlineManager } from '@tanstack/react-query'

export default function TabOneScreen() {
  const [search, setSearch] = useState('Any')
  const { isLoading, jokeError, joke, refetch } = useGetJokeQuery(search)
  useRefreshByUser(refetch)
  useRefreshOnFocus(refetch)

  type FormData = {
    search: string
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    setSearch(data.search)
  }

  if (isLoading) return <LoadingIndicator />
  if (jokeError) return <ErrorMessage error={jokeError}>Error</ErrorMessage>
  if (!joke) return <Text style={styles.title}>Not Found</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{onlineManager.isOnline() ? 'Online' : 'Offline'}</Text>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Search"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            returnKeyLabel="Search"
            returnKeyType="search"
            placeholderTextColor="#fff"
          />
        )}
        name="search"
      />
      {errors.search && <Text>This is required.</Text>}
      <JokeDisplay joke={joke} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#171717'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})

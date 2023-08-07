import React, { useState } from 'react'
import { StyleSheet, TextInput, Button } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useGetJokeQuery } from '@/data/client/test'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { ErrorMessage } from '@/components/ErrorMessage'

import { useForm, Controller } from 'react-hook-form'
import useDebounce from '@/hooks/useDebounce'

export default function TabOneScreen() {
  const [search, setSearch] = useState('Any')

  const debouncedSearchTerm = useDebounce(search, 200)
  const { isLoading, jokeError, joke } = useGetJokeQuery(debouncedSearchTerm)

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
          />
        )}
        name="search"
      />
      {errors.search && <Text>This is required.</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Text style={styles.title}>{joke.category}</Text>
      <Text style={styles.title}>{joke.delivery}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white'
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

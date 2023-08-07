import { Joke } from '@/types'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const JokeDisplay = ({ joke }: { joke: Joke }) => {
  if (joke.error) {
    ;<Text style={styles.setup}>Error{joke.message}</Text>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.category}>
        Category: {joke.category} Type: {joke.type}
      </Text>
      {joke.type === 'twopart' ? (
        <>
          <Text style={styles.setup}>{joke.setup}</Text>
          <Text style={styles.delivery}>{joke.delivery}</Text>
        </>
      ) : (
        <Text style={styles.setup}>{joke.joke}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 20,
    width: 300,
    alignItems: 'center'
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db'
  },
  setup: {
    fontSize: 18,
    marginBottom: 20
  },
  delivery: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555555'
  }
})

export default JokeDisplay

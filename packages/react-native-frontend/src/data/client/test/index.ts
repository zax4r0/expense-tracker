import { API_ENDPOINTS } from '@/data/endpoints'
import TestService from '@/data/services/test.service'
import { useQuery } from '@tanstack/react-query'

export function useGetJokeQuery(slug: string) {
  const jokeQuery = useQuery([API_ENDPOINTS.joke(slug)], () => TestService.get(slug))

  return {
    ...jokeQuery,
    joke: jokeQuery.data,
    isJokeLoading: jokeQuery.isLoading,
    jokeError: jokeQuery.error
  }
}

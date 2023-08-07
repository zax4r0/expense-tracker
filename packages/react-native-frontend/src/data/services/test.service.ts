import { Joke } from '@/types'
import { HttpClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'

const TestService = {
  get: (slug: string) => HttpClient.get<Joke>(API_ENDPOINTS.joke(slug))
}
export default TestService

import { AuthResponse, LoginUserInput, RegisterUserInput } from '@/types'
import { HttpClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'

const UserService = {
  login: (input: LoginUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
  verify: (token: string) => HttpClient.post<AuthResponse>(API_ENDPOINTS.TOKEN_VERIFY, token),
  register: (input: RegisterUserInput) => HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_REGISTER, input),
  logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {})
}
export default UserService

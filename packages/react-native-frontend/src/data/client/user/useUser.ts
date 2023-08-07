import userService from '@/data/services/user.service'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
  return useMutation(userService.login)
}

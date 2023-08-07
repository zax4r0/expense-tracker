export const API_ENDPOINTS = {
  USERS_LOGIN: '/user/token-auth/',
  joke: (slug: string) => `https://v2.jokeapi.dev/joke/Any?contains=${slug}`
}

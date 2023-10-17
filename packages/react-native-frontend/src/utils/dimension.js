export const handleSize = (num) => {
  if (num <= 0) return 0
  if (num > 100) return 1

  return num / 100
}

import { Dimensions } from 'react-native'

const myWidth = Dimensions.get('window').width
const myHeight = Dimensions.get('window').height

const width = (num) => myWidth * handleSize(num)
const height = (num) => myHeight * handleSize(num)
const totalSize = (num) => Math.sqrt(myHeight * myHeight + myWidth * myWidth) * handleSize(num)

export { width, height, totalSize }

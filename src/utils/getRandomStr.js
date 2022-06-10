const CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ZWSP = ['\u200b', '\u200c', '\u200d']

module.exports = () => {
  let char = ''
  let zwsp = ''

  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * CHAR.length)
    char += CHAR[random]
  }

  for (let i = 0; i < 32; i++) {
    const random = Math.floor(Math.random() * ZWSP.length)
    zwsp += ZWSP[random]
  }

  const result = {char, zwsp}
  return result
}
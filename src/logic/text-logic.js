const textSlice = (text) => {
  if (text.length < 150) return text
  let result = ''
  const edit = text.split(' ')
  for (let i = 0; i < edit.length; i++) {
    if (result.length < 150) {
      result += edit[i] + ' '
    } else {
      break
    }
  }
  return result + '...'
}

export default textSlice

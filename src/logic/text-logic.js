const textSlice = (text) => {
  if (text.length < 200) return text
  let result = ''
  const edit = text.split(' ')
  for (let i = 0; i < edit.length; i++) {
    if (result.length < 200) {
      result += edit[i] + ' '
    } else {
      break
    }
  }
  return result + '...'
}

export default textSlice

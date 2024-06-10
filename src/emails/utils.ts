export const truncateText = ({ text, characterlLimit = 32 }: { text: string, characterlLimit?: number }) => {
  if (text.length <= characterlLimit) {
    return text
  }
  return text.slice(0, characterlLimit) + '...'
}
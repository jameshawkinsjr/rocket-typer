let phrases = [
  "This is a test phrase!",
  "This is another test phrase.",
  "This is a third test phrase.",
  "How about another test phrase?"
]

export const randomPhrase = () => {
  // Generate random phrase
  let phraseNum = Math.floor(Math.random() * phrases.length)
  return phrases[phraseNum]
}
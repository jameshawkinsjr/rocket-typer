let phrases = [
  "This is a test phrase!",
  "This is another test phrase.",
  "This is a third test phrase. This is a third test phrase. This is a third test phrase. This is a third test phrase.",
  "How about another test phrase?",
  "I just want to tell you how I'm feeling. Gotta make you understand. Never gonna give you up, never gonna let you down, never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you."
]

export const randomPhrase = () => {
  // Generate random phrase
  let phraseNum = Math.floor(Math.random() * phrases.length);
  return phrases[phraseNum];
}
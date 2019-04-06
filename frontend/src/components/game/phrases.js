let phrases = [
  "Every great magic trick consists of three parts or acts. The first part is called The Pledge. The magician shows you something ordinary: a deck of cards, a bird or a man. He shows you this object. Perhaps he asks you to inspect it to see if it is indeed real, unaltered, normal. But of course... it probably isn't. The second act is called The Turn. The magician takes the ordinary something and makes it do something extraordinary. Now you're looking for the secret... but you won't find it, because of course you're not really looking. You don't really want to know. You want to be fooled.",
  "Don't talk like one of them. You're not! Even if you'd like to be. To them, you're just a freak, like me! They need you right now, but when they don't, they'll cast you out, like a leper! You see, their morals, their code, it's a bad joke. Dropped at the first sign of trouble. They're only as good as the world allows them to be. I'll show you. When the chips are down, these... these civilized people, they'll eat each other. See, I'm not a monster. I'm just ahead of the curve.",
  "It's been more than thirty years since the wolf and the winter cold. And now, as then, it is not fear that grips him, only restlessness. A heightened sense of things. The seaborn breeze, coolly, kissing the sweat at his chest and neck. Gulls cawing, complaining, even as they feast on the thousands of floating dead. The steady breathing of the 300 at his back, ready to die for him without a moment's pause. Everyone of them ready, to die.",
  "I know what it's like to lose. To feel so desperately that you're right, yet to fail nonetheless. It's frightening, turns the legs to jelly. I ask you to what end? Dread it. Run from it. Destiny arrives all the same. And now it's here.",
  "I just want to tell you how I'm feeling. Gotta make you understand. Never gonna give you up, never gonna let you down, never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.",
  "Test"
]

export const randomPhrase = () => {
  // Generate random phrase
  let phraseNum = Math.floor(Math.random() * phrases.length);
  return phrases[phraseNum];
}
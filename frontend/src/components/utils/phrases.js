let phrases = [
  ["Every great magic trick consists of three parts or acts. The first part is called The Pledge. The magician shows you something ordinary: a deck of cards, a bird or a man. He shows you this object. Perhaps he asks you to inspect it to see if it is indeed real, unaltered, normal. But of course... it probably isn't. The second act is called The Turn. The magician takes the ordinary something and makes it do something extraordinary. Now you're looking for the secret... but you won't find it, because of course you're not really looking. You don't really want to know. You want to be fooled.", "The Prestige"],
  ['Words per minute (WPM) is a measure of typing speed, commonly used in recruitment. For the purposes of WPM measurement a word is standardized to five characters or keystrokes. Therefore, "brown" counts as one word, but "mozzarella" counts as two. The benefits of a standardized measurement of input speed are that it enables comparison across language and hardware boundaries. The speed of an Afrikaans-speaking operator in Cape Town can be compared with a French-speaking operator in Paris.', "Wikipedia: Typing"],
  ["Don't talk like one of them. You're not! Even if you'd like to be. To them, you're just a freak, like me! They need you right now, but when they don't, they'll cast you out, like a leper! You see, their morals, their code, it's a bad joke. Dropped at the first sign of trouble. They're only as good as the world allows them to be. I'll show you. When the chips are down, these... these civilized people, they'll eat each other. See, I'm not a monster. I'm just ahead of the curve.", "The Dark Knight"],
  ["It's been more than thirty years since the wolf and the winter cold. And now, as then, it is not fear that grips him, only restlessness. A heightened sense of things. The seaborn breeze, coolly, kissing the sweat at his chest and neck. Gulls cawing, complaining, even as they feast on the thousands of floating dead. The steady breathing of the 300 at his back, ready to die for him without a moment's pause. Everyone of them ready, to die.", "300"],
  ["I know what it's like to lose. To feel so desperately that you're right, yet to fail nonetheless. It's frightening, turns the legs to jelly. I ask you to what end? Dread it. Run from it. Destiny arrives all the same. And now it's here.", "Avengers: Infinity War"],
  ["If I drive for you, you give me a time and a place. I give you a five-minute window, anything happens in that five minutes and I'm yours no matter what. I don't sit in while you're running it down. I don't carry a gun. I drive.", "Driver"],
  ['Do you understand that the world does not revolve around you and your "do whatever it takes, ruin as many people\'s lives, so long as you can make a name for yourself as an investigatory journalist, no matter how many friends you lose or people you leave dead and bloodied along the way, just so long as you make a name for yourself as an investigatory journalist, no matter how many friends you lose or people you leave dead and bloodied and dying along the way?', "Zoolander"],
  ["Sometimes I'll start a sentence, and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation. An improversation.", "The Office"],
  ["I don't have money. But what I do have are a very particular set of skills; skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you let my daughter go now, that'll be the end of it. I will not look for you, I will not pursue you. But if you don't, I will look for you, I will find you, and I will kill you.", "Taken"],
  ["Wha? Wait, let me explain something to you. I am not Mr. Lebowski. You're Mr. Lebowski. I'm the dude. So that's what you call me. You know. Uh, that or His Dudeness, Duder, or uh El Duderino if you're not into the whole brevity thing.", "The Big Lebowski"],
  ["I just want to tell you how I'm feeling. Gotta make you understand. Never gonna give you up, never gonna let you down, never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.", "Never Gonna Give You Up"],
  ["Will you fight? Aye, fight and you may die, run and you'll live, at least a while. And dying in your beds many years from now, would you be willing to trade all of this, from this day to that, for one chance, just one chance, to come back here and tell our enemies that they may take our lives but they'll never take our freedom!", "Braveheart"],
  ["The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness. For he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know I am the Lord when I lay my vengeance upon thee." , "Pulp Fiction"],
  ["Drainage! Drainage, Eli, you boy. Drained dry. I'm so sorry. Here, if you have a milkshake, and I have a milkshake, and I have a straw. There it is, that's a straw, you see? You watching? And my straw reaches across the room, and starts to drink your milkshake… I…drink…your…milkshake! I drink it up!", "There Will Be Blood"],
  ["I personally believe that U.S. Americans are unable to do so because, uh, some, uh, people out there in our nation don't have maps and, uh, I believe that our education like such as in South Africa and, uh, the Iraq, everywhere like such as, and, I believe that they should, our education over here in the U.S. should help the U.S., uh, or, uh, should help South Africa and should help the Iraq and the Asian countries, so we will be able to build up our future. For our children.", "Miss Teen USA pageant 2007"],
  ["Hey. Hey. Do you know me? I'm the guy that tells you there are guys you can hit and there's guys you can't. Now that's not quite a guy you can't hit, but it's almost a guy you can't hit. So I'm gonna make a ruling on this right now. You don't hit him. Understand?", "The Departed"],
  ["Some men are born mediocre, some men achieve mediocrity, and some men have mediocrity thrust upon them. With Major Major it had been all three. Even among men lacking all distinction he inevitably stood out as a man lacking more distinction than all the rest, and people who met him were always impressed by how unimpressive he was.", "Catch-22"],
  ["He struggled with himself, too. I saw it -- I heard it. I saw the inconceivable mystery of a soul that knew no restraint, no faith, and no fear, yet struggling blindly with itself.", "Heard of Darkness"],
  ["The Ministry of Truth, which concerned itself with news, entertainment, education and the fine arts. The Ministry of Peace, which concerned itself with war. The Ministry of Love, which maintained law and order. And the Ministry of Plenty, which was responsible for economic affairs.", "Nineteen Eighty-Four"],
  ["It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived.", "To Kill A Mockingbird"],
  ["You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And YOU are the one who'll decide where to go...", "Oh, the Places You'll Go!"],
  ["The rules of the Hunger Games are simple. In punishment for the uprising, each of the twelve districts must provide one girl and one boy, called tributes, to participate. The twenty-four tributes will be imprisoned in a vast outdoor arena that could hold anything from a burning desert to a frozen wasteland. Over a period of several weeks, the competitors must fight to the death. The last tribute standing wins.", "The Hunger Games"],


  // ["Test2", "Test2"],
]

export const randomPhrase = () => {
  // Generate random phrase
  let phraseNum = Math.floor(Math.random() * phrases.length);
  return phrases[phraseNum];
}
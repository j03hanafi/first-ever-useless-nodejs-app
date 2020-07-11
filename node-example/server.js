const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const compliments = [
  "You like nice today",
  "That dress looks nice on you",
  "Have you been working out?",
  "You can do hard things",
  "You've gotten far in this course. You're really smart",
  "You're programming! How cool is that?",
  "I'm really proud of you",
  "You made this",
  "You've learned a lot of things, and that's pretty hard to do",
  "Welcome!! You are jumping into a vast and foreign world. It will take time to see the whole picture so just remember that every small thing that you learn is an important step forward. With time, it will all come together.",
  "This shit ain't easy. But it's totally worth it ❤️",
  "If it's not hard, you're not learning anything",
  "Congratulations on starting your journey. Some things might come easy, others might be crazy challenging, but all will be possible with perseverance. When things get hard, keep pushing through and don't be afraid to ask for help. Lots of us love helping, just ask.",
  "Engineering is modern Magic. Programming is an engineering process. Hence it is magical. Don't you want to be a magician? Rest assured there is definitely a type of magic you will be good at. Don't give up without trying. And on top of that you can make a good living with it.",
  "Don't listen to anyone early on who says 'Such and such is an anti-pattern', or 'This is so simple' even though it's complicated to you. Just build as many different sites as you can and you will gain experience. Most of all, have fun doing it.",
  "Be patient with yourself when things are hard, because you can do it! Take breaks. Ask for help. You'll do great.",
  "Tomorrow you will know more than you do today. And use every opportunity and encounter as a place to learn something new.",
  "Everyone you'll work with was you once. And you're gonna be dope.",
  "Remember every time you feel frustrated you're one missing semicolon from feeling like an absolute genius ;)",
  "The highs and lows are so real, but once you get something working, it's an unbelievable feeling. Usually screaming and jumping up and down. :D",
  "Programming has a relatively short history compared to other fields. You'll find that things that seem ancient aren't. Learning the history of the technologies you use helps put their newness in perspective. We're all still collectively figuring it out. You can be a part of this.",
  "The best way to learn how to code is by teaching others! Teach someone every step of the way.",
  "It's going to get better, I promise.",
  "No one, even the people you look up to, were born knowing any of this. You're starting out the same way all of them did! You're on your way to being proficient every time you practice.",
  "You will make mistakes, and you will learn from them. It is how we grow.",
  "Keep your initial successes going by reaching out to a mentor. All these people want to help (for free) because they love development just as much as you now do! ",
  "Keep a rubber ducky on your desk; when you’re stuck but don’t want to embarrass yourself by asking a senior dev for help, explain your problem, *out loud*, to the duck.",
  "Don't worry if your code doesn't work the first time. It almost never does. Every time you hit an error is an opportunity to learn something.",
  "Honestly you've come in at a great time. Things are more open than they've ever been. There will be rough patches, but you've gotten through so many before, and you'll get through these. Keep moving forward and never be afraid to ask questions.",
  "Step 1: Build something/anything. Step 2: Repeat Step 1.",
  "You will feel you can’t do something or don’t know enough. Don’t worry - the person you look up to in the industry feels that way about themselves too. We’ve all been there.",
  "Feels kinda like cracking the code in the Matrix, right? 🧠 Congratulations; you now have a super power! 🚀",
  "What you're ebarking on is an amazing adventure. There will be lits of tough times, struggle, wins, losses, losses you thought were wins and wins you thought were losses. This is the most fun, rewarding, and useful set of skills to learn now and going forward. U GOT THIS!",
  "Welcome to the fun, tough, rewarding, whirlwind world of web dev. I’m super excited you’ve made the choice to jump in! Know this-many times you’ll feel like you’re not getting it or that you’ll never get it. Just remember we were once were you are now. We did it, YOU CAN TOO 🙌🏽",
  "This industry is perfect for beginners. You jump in and can start contributing in exciting and valuable ways. Keep going! And welcome to the world of web development!",
  "You are going to get frustrated and think that you aren't cut out to be a developer. This is hogwash. Learning to program is HARD and every professional dev has gone through the same frustrations. Keep at it!",
  "You can do this. You've learned so much in your life this is just one more thing. No biggie. When it doesn't work take a break and keep going. Everyone faces this.",
  "It is easy to doubt yourself, we all do it. But keep in mind that self doubt is very close to self reflection, a skill necessary to learn and grow, something every engineer must continually do. You are not alone.",
  "It gets easier over time, then it gets hard, and then easy again. Keep moving, you're doing great!",
  "It’s hard for everyone, even the seniors. Take your time, take a deep breath. You’re going to do great.",
  "Congrats! This is a huge step towards becoming more capable then you can ever imagine, trust the process, you are well on your way.",
  "You’re taking a step that’ll bring you so much power, power to build ANYTHING you want, something straight from your heart. I can’t wait to see you #unleash! Just build!",
  "The journey will feel impossible some times and that’s ok.",
  "Don't let thoughts about your age affect how well you think you'll do in this field. With diligence and practice you'll find your niche.",
  "You are the future of dev. There will be a time where you are the seniors giving pep talks to newer developers. Keep working at it!",
  "You got this. We are all new at something all the time. If you find being a Dev as a whole is satisfying, rewarding, interesting to you.... keep at it! We're in this learning journey together!",
  "Never stop asking questions and keep asking for help. It's okay to not know something. Its not okay to beat yourself up over not knowing something. Be kind to yourself, and be kind to others. We're all in this together.",
  "Don’t ever be too scared to ask questions",
  "Hey, welcome to the party! Let’s build cool stuff together!",
  "A world without you is a sad world",
  "Anyone can be a web developer, the only people who can’t are those who give up too early! One day it just clicks.",
  "When things aren’t working take a breath, and carefully check everything. If you can’t figure it out after 30 minuets just take a break. Go for a jog or get a coffee. Coming back with a fresh outlook helps more then you think!",
  "As you continue in your journey, you’ll inevitably find a person or problem that makes you fell “unworthy” or “unknowing”. That feeling is so common it has a name: imposter syndrome. It is bullshit. You know more about development than the majority of the populous. Go kick ass!",
  "Don't be afraid of making mistakes when programming -- if something isn't working, just step through and understand what the program was thinking. People value those who can understand why a bug is happening far more than someone who writes perfect code.",
  "Go forth and make things!",
  "Ever thought 'I am not good enough to be a developer!'?Yeah, me too - this morning. And the day before. And the day before that... For the last 20 years. Yet still, I ❤️ doing it, and even better; I get paid for it!",
  "You now have the tools to get out there where you’ll create, build, and discover. Never stop learning! Reach out to others when you’re stuck. You’re gonna rock it!!",
  "It doesn’t make you a bad coder if you have to look up documentation. I still look up the map, filter, reduce. I’ll forget how to use it again. You win by banging your head against the wall, until the wall miraculously moves.",
];

function getRandomComplement() {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  return compliments[randomIndex];
}

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/compliment", function (req, res) {
  res
    .json({
      compliment: getRandomComplement(),
    })
    .end();
});

app.use("/public", express.static("./public"));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);

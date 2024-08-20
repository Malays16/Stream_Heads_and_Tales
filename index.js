#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const logFile = process.argv[2] || 'log.json';

function flipCoin() {
  return Math.floor(Math.random() * 2) + 1;
}

function log(result) {
  let logData = [];
  if (fs.existsSync(logFile)) {
    logData = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  }
  logData.push(result);
  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2), 'utf8');
}

function startGame() {
  const coin = flipCoin();
  rl.question('Угадайте: 1 или 2? ', answer => {
    const userAnswer = parseInt(answer, 10);
    if (userAnswer !== 1 && userAnswer !== 2) {
      console.log('Вы должны ввести 1 или 2.');
    } else {
      const result = {
        userAnswer,
        coin,
        correct: userAnswer === coin,
        date: new Date()
      };

      log(result);
      if (userAnswer === coin) {
        console.log('Вы угадали!');
      } else {
        console.log('Вы не угадали');
      }
    }
    rl.close();
  });
}

startGame();
"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster');
const $msg = document.querySelector("#js-msg");

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = new Hero(this, name);
    this.monsterList = [{
        name: "GreenSnail",
        hp: 25,
        att: 10,
        xp: 10
      },
      {
        name: "Slime",
        hp: 50,
        att: 15,
        xp: 20
      },
      {
        name: "RibbonPig",
        hp: 150,
        att: 35,
        xp: 50
      },
    ];
    this.start();
  }
  start() {
    $gameModeForm.addEventListener('click', this.onGameMenuInput);
    $battleModeForm.addEventListener('click', this.onBattleMenuInput);
    this.changeScreen('game');
  }
  changeScreen(screen) {
    if (screen === 'start') {
      $setNameForm.style.display = 'block';
      $gameModeForm.style.display = 'none';
      $battleModeForm.style.display = 'none';
    } else if (screen === 'game') {
      $setNameForm.style.display = 'none';
      $gameModeForm.style.display = 'block';
      $battleModeForm.style.display = 'none';
    } else if (screen === 'battle') {
      $setNameForm.style.display = 'none';
      $gameModeForm.style.display = 'none';
      $battleModeForm.style.display = 'block';
    }

  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    const random = Math.floor(Math.random() * monsterList.length);
    if (menuBtn.id === '1') { //1.모험
      /*const randomMonster = JSON.parse(JSON.stringify(monsterList[random]));
      currentMonster = randomMonster //random monster 생성
      $aboutMonster.textContent = `${currentMonster.name}, HP: ${currentMonster.hp}/${currentMonster.maxHp}`;*/
      this.changeScreen('battle');
    } else if (menuBtn.id === '2') { //2.휴식
      initialHero.hp = initialHero.maxHp;
    } else if (menuBtn.id === '3') { //3.end
      $gameModeForm.style.display = "none";
      $msg.textContent = "Exit the game.";
      $msg.style.display = "block";
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    if (!heroTurn) return; //monster turn일 경우
    //hero turn
    if (menuBtn.id === '1') { //1.공격
      currentMonster.hp -= initialHero.att; //hero 공격
      if (currentMonster.hp <= 0) { //이겼을 경우
        $msg.textContent = "Win!!";
        $msg.style.display = "block";
        initialHero.xp += currentMonster.xp;
      } else if (currentMonster.hp > 0) {
        monsterTurn();
      }
    } else if (menuBtn.id === '2') { //2.회복
      initialHero.hp = initialHero.maxHp;
      monsterTurn();
    } else if (menuBtn.id === '3') { //3.도망
      runAway("Let's run away!", 1000);
    }
  }
}

class Hero {
  constructor(game, name) {
    this.name = name;
    this.game = game;
    this.lev = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.xp = 0;
    this.att = 10;
  }
  attack(target) {
    target.hp -= this.att;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}

class Monster {
  constructor(game, name, hp, xp, att) { //monster 생성 
    tihs.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

let game = null;
const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  const name = target["hero-name"].value;
  game = new Game(name);
}

/*
const checkHp = (turn, other) => {
  if (other.hp === 0) {
    console.log(`${turn}win`);
  }
  heroTurn = false;
  if (heroTurn) return;
  setInterval(() => {
    console.log(`1`)
  }, 2000);
}
let heroTurn = true;

const runAway = (text, ms) => {
  $msg.textContent = text;
  $msg.style.display = "block";
  setTimeout(() => {
    $msg.style.display = "none";
    $battleModeForm.style.display = "none";
    $gameModeForm.style.display = "block";
  }, ms);
}

const monsterTurn = () => { //monster 공격(timeOut)
  heroTurn = false;
  setTimeout(() => {
    initialHero.hp -= currentMonster.att;
    $aboutHero.textContent = `${initialHero.name}, Level${initialHero.level}, HP: ${initialHero.hp}/${initialHero.maxHp}, XP: ${initialHero.xp}/${initialHero.level* 15} , Att: ${initialHero.att} `;
    if (initialHero.hp <= 0) { //졌을 경우
      runAway(`I lost to a ${currentMonster.name}. Let's run away!!`, 3000);
    }
    heroTurn = true;
  }, 1000);
}
*/
function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력
}

init();
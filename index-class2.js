"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster');
const $msg = document.querySelector("#js-msg");

class Game {
  constructor(name) {
    this.hero = new Hero(this, name);
    this.monster = new Monster(this);
    this.start();
  }
  start() {
    $gameModeForm.addEventListener('click', this.handleGameMode); //game mode
    $battleModeForm.addEventListener('click', this.handleBattleMode); //battle mode
    console.log(`start game`);
  }
  changeScreen(mode) {
    if (mode === 'game') {
      $setNameForm.style.display = 'none';
      $aboutHero.style.display = 'block';
      $gameModeForm.style.display = 'block';
      $battleModeForm.style.display = 'none';
    } else if (mode === 'battle') {
      $setNameForm.style.display = 'none';
      $aboutHero.style.display = 'block';
      $gameModeForm.style.display = 'none';
      $battleModeForm.style.display = 'block';
    }
  }
  handleGameMode = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    // const random = Math.floor(Math.random() * monsterList.length);
    if (menuBtn.id === '1') { //1.모험
      console.log(this.monster);
      /*
      const randomMonster = JSON.parse(JSON.stringify(monsterList[random]));
      currentMonster = randomMonster //random monster 생성
      $aboutMonster.textContent = `${currentMonster.name}, HP: ${currentMonster.hp}/${currentMonster.maxHp}`;*/
    } else if (menuBtn.id === '2') { //2.휴식
      initialHero.hp = initialHero.maxHp;
    } else if (menuBtn.id === '3') { //3.end
      $gameModeForm.style.display = "none";
      $msg.textContent = "Exit the game.";
      $msg.style.display = "block";
    }
  }
}
class Hero {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.lev = 1;
    this.hp = 100;
    this.maxHp = 100;
    this.xp = 0;
    this.att = 10;
    this.info();
  }
  info() {
    $aboutHero.textContent = `${this.name} Lev${this.lev} ‖ HP: ${this.hp}/${this.maxHp} ‖ XP: ${this.xp}/${this.lev * 15} ‖ ATT: ${this.att}`;
  }
}
class Monster {
  constructor(game) {
    this.game = game;
    this.monsterList = [
      {name:'GreenSnail', hp: 20, xp: 10, att: 10},
      {name:'Slime', hp: 40, xp: 20, att: 20},
      {name:'RibbonPig', hp: 80, xp: 40, att: 40}
    ];
  }
}
let game = null;
const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  const name = target["hero-name"].value;
  game = new Game(name);
  game.changeScreen('game');
  // $setNameForm.style.display = "none";
  // gameMode();
}
const initialHero = { //주인공 생성

  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  }
}

const gamemode111 = (event) => {
  event.preventDefault();
  const menuBtn = event.target;
  const random = Math.floor(Math.random() * monsterList.length);
  if (menuBtn.id === '1') { //1.모험
    const randomMonster = JSON.parse(JSON.stringify(monsterList[random]));
    currentMonster = randomMonster //random monster 생성
    $aboutMonster.textContent = `${currentMonster.name}, HP: ${currentMonster.hp}/${currentMonster.maxHp}`;
    $gameModeForm.style.display = "none";
    $battleModeForm.style.display = "block";
  } else if (menuBtn.id === '2') { //2.휴식
    initialHero.hp = initialHero.maxHp;
  } else if (menuBtn.id === '3') { //3.end
    $gameModeForm.style.display = "none";
    $msg.textContent = "Exit the game.";
    $msg.style.display = "block";
  }
  $aboutHero.textContent = `${initialHero.name}, Level${initialHero.level}, HP: ${initialHero.hp}/${initialHero.maxHp}, XP: ${initialHero.xp}/${initialHero.level* 15} , Att: ${initialHero.att} `;
}

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

const handleBattleMode = (event) => {
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
  $aboutMonster.textContent = `${currentMonster.name}, HP: ${currentMonster.hp}/${currentMonster.maxHp}`;
  $aboutHero.textContent = `${initialHero.name}, Level${initialHero.level}, HP: ${initialHero.hp}/${initialHero.maxHp}, XP: ${initialHero.xp}/${initialHero.level* 15} , Att: ${initialHero.att} `;
}

function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력

}

init();
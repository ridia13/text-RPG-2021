"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster');
const $msg = document.querySelector("#js-msg");
const initialHero = { //주인공 생성
  name: '',
  level: 1,
  hp: 100,
  maxHp: 100,
  xp: 0,
  att: 10,
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  }
}
class Monster {
  constructor(name, level) { //monster 생성 
    this.name = name;
    this.level = level;
    this.hp = this.level * 20;
    this.maxHp = this.hp;
    this.att = this.level * 2;
    this.xp = this.att + 5;
  }
}
const monster1 = new Monster('GreenSnail', 5);
const monster2 = new Monster('Slime', 10);
const monster3 = new Monster('RibbonPig', 20);
const monsterList = [monster1, monster2, monster3];
let currentMonster;

const gameMode = () => {
  $aboutHero.textContent = `${initialHero.name}, Level${initialHero.level}, HP: ${initialHero.hp}/${initialHero.maxHp}, XP: ${initialHero.xp}/${initialHero.level* 15} , Att: ${initialHero.att} `;
  $aboutHero.style.display = "block";
  $gameModeForm.style.display = "block";
}

const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  initialHero.name = target["hero-name"].value;
  $setNameForm.style.display = "none";
  gameMode();
}

const handleGameMode = (event) => {
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
  $gameModeForm.addEventListener('click', handleGameMode); //game mode
  $battleModeForm.addEventListener('click', handleBattleMode); //battle mode
}

init();
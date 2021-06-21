"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster');
const $exitMsg = document.querySelector("#js-exitMsg");
const initialHero = { //주인공 생성
  name: '',
  level: 1,
  hp: 100,
  maxHp: 100,
  xp: 0,
  att: 10
}

function Monster(name, level) { //monster 생성 
  this.name = name;
  this.level = level;
  this.hp = this.level * 20;
  this.maxHp = this.hp;
  this.att = this.level * 2;
  this.xp = this.att + 5;
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
    console.log(initialHero);
  } else if (menuBtn.id === '3') { //3.end
    $gameModeForm.style.display = "none";
    $exitMsg.style.display = "block";
  }
}

function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력
  $gameModeForm.addEventListener('click', handleGameMode); //game mode
}

init();
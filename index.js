"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $gameModeForm = document.querySelector("#js-gameMode"),
  $aboutHero = document.querySelector('#js-aboutHero');
const $battleModeForm = document.querySelector("#js-battleMode"),
$aboutMonster = document.querySelector('#js-aboutMonster');
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
  this.maxHp = this.level * 20;
  this.hp = this.maxHp;
  this.att = this.level * 2;
}

const monster1 = new Monster('GreenSnail', 5);
const monster2 = new Monster('Slime', 10);
const monster3 = new Monster('RibbonPig', 20);

const monsters = [monster1, monster2, monster3];
let currentMonster;
const gameMode = () => {
  $aboutHero.textContent = `Name : ${initialHero.name}, Level : ${initialHero.level}, Hp : ${initialHero.hp} / ${initialHero.maxHp}, Xp : ${initialHero.xp} / ${initialHero.level* 15} , Att : ${initialHero.att} `;
  $gameModeForm.style.display = "block";
}

const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  initialHero.name = target["hero-name"].value;
  $setNameForm.style.display = "none";
  gameMode();
}

const random = Math.floor(Math.random() * monsters.length);
const handleGameMode = (event) => {
  event.preventDefault();
  const menuBtn = event.target;
  if (menuBtn.id === '1') { //1.모험
    currentMonster = monsters[random]; //random monster 생성
    $aboutMonster.textContent = `Name : ${currentMonster.name}, Level : ${currentMonster.level}, Hp : ${currentMonster.hp}, Att : ${currentMonster.att} `;
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
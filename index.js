"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $gameModeForm = document.querySelector("#js-gameMode"),
  $aboutHero = document.querySelector('#js-aboutHero');
const initialHero = {
  name: '',
  level: 1,
  hp: 100,
  maxHp: 100,
  xp: 0,
  att: 10
}

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



function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력
  //주인공 생성
}

init();
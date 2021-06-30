"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero'),
  $heroName = $aboutHero.querySelector('#js-name'),
  $heroLevel = $aboutHero.querySelector('#js-lev'),
  $heroHp = $aboutHero.querySelector('#js-hp'),
  $heroXp = $aboutHero.querySelector('#js-xp'),
  $heroAtt = $aboutHero.querySelector('#js-att');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster'),
  $monsterName = $aboutMonster.querySelector('#js-mName'),
  $monsterHp = $aboutMonster.querySelector('#js-mHp'),
  $monsterAtt = $aboutMonster.querySelector('#js-mAtt');
const $msg = document.querySelector("#js-msg");

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
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
    this.start(name);
  }
  start(name) { //게임과 관련된 것들
    $gameModeForm.addEventListener('click', this.onGameMenuInput);
    $battleModeForm.addEventListener('click', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name);
    this.updateHeroStat(); //updateHeroStat 방법1
  }
  changeScreen(screen) {
    if (screen === 'start') {
      $setNameForm.style.display = 'block';
      $gameModeForm.style.display = 'none';
      $battleModeForm.style.display = 'none';
    } else if (screen === 'game') {
      $setNameForm.style.display = 'none';
      $aboutHero.style.display = 'block';
      $gameModeForm.style.display = 'block';
      $battleModeForm.style.display = 'none';
    } else if (screen === 'battle') {
      $setNameForm.style.display = 'none';
      $aboutHero.style.display = 'block';
      $gameModeForm.style.display = 'none';
      $battleModeForm.style.display = 'block';
    }

  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const game = this;
    const menuBtn = event.target;
    const randomIndex = Math.floor(Math.random() * this.monsterList.length);
    if (menuBtn.id === '1') { //1.모험
      game.changeScreen('battle');
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.xp,
        randomMonster.att
      );
      console.log(this.monster);
      this.updateHeroStat();
      this.showMessage(`I ran into a monster. I think it's a ${this.monster.name}.`);
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
    if (menuBtn.id === '1') { //1.공격
      const {
        hero,
        monster
      } = this;
      hero.attack(monster);
      monster.attack(hero);
      this.showMessage(`I gave the monster damage ${hero.att}, and I got damage ${monster.att}.`);
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (menuBtn.id === '2') { //2.회복
      initialHero.hp = initialHero.maxHp;
      monsterTurn();
    } else if (menuBtn.id === '3') { //3.도망
      this.changeScreen('game');
    }
  }
  updateHeroStat() {
    //hero 상태 바뀔 때
    const {
      hero
    } = this;
    if (hero === null) { //(null === hero 전사)hero 없으면 안바꿈
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    //화면도 변화, hero 있으면 바꿈
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `HP: ${hero.xp}/${hero.lev*15}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
    console.log(hero);
  }
  updateMonsterStat() {
    const {
      monster
    } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;

  }
  showMessage(text) {
    $msg.textContent = text;
    console.log(`msg`);
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
    this.game.updateHeroStat() //updateHeroStat 방법2
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
    this.game = game;
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
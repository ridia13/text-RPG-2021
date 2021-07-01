"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero'),
  $heroName = $aboutHero.querySelector('#js-name'),
  $heroLevel = $aboutHero.querySelector('#js-lev'),
  $heroHp = $aboutHero.querySelector('#js-hp'),
  $heroXp = $aboutHero.querySelector('#js-xp'),
  $heroAtt = $aboutHero.querySelector('#js-att'),
  $heroHeal = $aboutHero.querySelector('#js-heal');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster'),
  $monsterName = $aboutMonster.querySelector('#js-mName'),
  $monsterHp = $aboutMonster.querySelector('#js-mHp'),
  $monsterAtt = $aboutMonster.querySelector('#js-mAtt');
const $msg = document.querySelector("#js-msg");
let game = null;

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
    const {
      hero
    } = this;
    const menuBtn = event.target;
    if (menuBtn.id === '1') { //1.모험
      game.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.xp,
        randomMonster.att
      );
      this.updateHeroStat();
      this.updateMonsterStat();
      this.showMessage(`I ran into a monster. I think it's a ${this.monster.name}.`);
    } else if (menuBtn.id === '2') { //2.휴식
      hero.hp = hero.maxHp;
      this.showMessage(`I recovered all my strength.`);
      this.updateHeroStat();
    } else if (menuBtn.id === '3') { //3.end
      $gameModeForm.style.display = "none";
      $msg.textContent = "Exit the game.";
      $msg.style.display = "block";
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    const {
      hero,
      monster
    } = this;
    if (menuBtn.id === '1') { //1.공격
      hero.attack(monster);
      monster.attack(hero);
      this.checkHp();
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (menuBtn.id === '2') { //2.회복
      hero.heal(monster);
      this.checkHp();
      this.showMessage(`I recovered my HP by ${hero.recover}.`);
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (menuBtn.id === '3') { //3.도망
      this.showMessage(`Let's run away!!`);
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
      $heroHeal.textContent = '';
      return;
    }
    //화면도 변화, hero 있으면 바꿈
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `Lev${hero.lev}`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${hero.lev*15}`;
    $heroHeal.textContent = `HEAL: ${hero.recover}`;
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
  gameOver() {
    //초기화
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameModeForm.removeEventListener('click', this.onGameMenuInput);
    $battleModeForm.removeEventListener('click', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
  checkHp() {
    let {
      hero,
      monster
    } = this;
    if (monster.hp <= 0) { //monster 죽었을 때
      this.showMessage(`Defeat the ${monster.name} and get ${monster.xp} experience points.`);
      hero.getXp(monster);
      monster = null;
      this.changeScreen('game');
    } else if (hero.hp <= 0) { //hero 전사 했을 때
      this.showMessage(`The hero is dead. Make a new hero.`);
      this.gameOver();
    } else { //게임 진행중
      this.showMessage(`I gave the monster damage ${hero.att}, and I got damage ${monster.att}.`);
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
    this.recover = 20;
    this.game.updateHeroStat() //updateHeroStat 방법2
  }
  attack(target) {
    target.hp -= this.att;
  }
  heal(monster) {
    this.hp += this.recover;
    this.hp -= monster.att;
  }
  getXp( monster) {
    this.xp += monster.xp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.hp = this.maxHp;
      this.att += 5;
      this.recover += 5;
      this.game.showMessage(`Level up!! your level is ${this.lev}.`);
    }
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

const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  const name = target["hero-name"].value;
  game = new Game(name);
}

function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력
}

init();
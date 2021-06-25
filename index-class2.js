"use strict";

const $setNameForm = document.querySelector("#js-setName");
const $aboutHero = document.querySelector('#js-aboutHero');
const $gameModeForm = document.querySelector("#js-gameMode");
const $battleModeForm = document.querySelector("#js-battleMode"),
  $aboutMonster = $battleModeForm.querySelector('#js-aboutMonster');
const $msg = document.querySelector("#js-msg");

let game = null;
let monsterLi = null;
let currnetM = null;

class Game {
  constructor(name) {
    this.hero = new Hero(this, name);
    this.monster = new Monster(this);
    this.start();
  }
  start() {
    $gameModeForm.addEventListener('click', this.handleGameMode); //game mode
    $battleModeForm.addEventListener('click', this.handleBattleMode); //battle mode
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

  changeStatus() {
    this.hero.info();
    console.dir(this.monster);
    this.monster.info();
  }

  handleGameMode = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    monsterLi = [...this.monster.monsterList];
    const random = Math.floor(Math.random() * monsterLi.length);
    if (menuBtn.id === '1') { //1.모험
      currnetM = JSON.parse(JSON.stringify(monsterLi[random]));
      this.monster.monster = currnetM;
      this.changeScreen('battle');
    } else if (menuBtn.id === '2') { //2.휴식
      this.hero.hp = this.hero.maxHp;
    } else if (menuBtn.id === '3') { //3.end
      $gameModeForm.style.display = "none";
      $msg.textContent = "Exit the game.";
      $msg.style.display = "block";
    }
    this.changeStatus();
  }

  handleBattleMode = (event) => {
    event.preventDefault();
    const menuBtn = event.target;
    // if (!heroTurn) return; //monster turn일 경우
    //hero turn
    const currentM = this.monster.monster;
    if (menuBtn.id === '1') { //1.공격
      this.hero.attack(currnetM);
      if (currnetM.hp <= 0) { //이겼을 경우
        this.hero.xp += currnetM.xp;
        this.hero.runAway(this, `Win!! ${currnetM.name} is run away!`, 2000);
      } else if (currnetM.hp > 0) {
        setTimeout(() => {
          this.monster.attack(this.hero); //monster 공격
          if (this.hero.hp <= 0) { //졌을 경우
            this.hero.runAway(this, `Loseㅠㅜ Let's run away!`, 2000);
          }
          this.changeStatus();
        }, 1000);
      }
    } else if (menuBtn.id === '2') { //2.회복
      // initialHero.hp = initialHero.maxHp;
      this.hero.hp >= this.hero.maxHp - 20 ? this.hero.hp = this.hero.maxHp : this.hero.hp += 20;
      setTimeout(() => {
        this.monster.attack(this.hero);
        this.changeStatus();
      }, 1000);
    } else if (menuBtn.id === '3') { //3.도망
      this.hero.runAway(this, "Let's run away!", 1000);
    }
    this.changeStatus();
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
  attack(monster) {
    monster.hp -= this.att;
  }
  runAway(game, text, ms) {
    $msg.textContent = text;
    $msg.style.display = "block";
    setTimeout(() => {
      $msg.style.display = "none";
      game.changeScreen('game');
    }, ms);
  }

}
class Monster {
  constructor(game) {
    this.game = game;
    this.monsterList = [{
        name: 'GreenSnail',
        hp: 20,
        xp: 10,
        att: 10
      },
      {
        name: 'Slime',
        hp: 40,
        xp: 20,
        att: 20
      },
      {
        name: 'RibbonPig',
        hp: 80,
        xp: 40,
        att: 40
      }
    ];
    this.monster = currnetM;
  }
  info() {
    $aboutMonster.textContent = `${this.monster.name} ‖ HP: ${this.monster.hp}`;
  }
  attack(hero) {
    hero.hp -= this.monster.att;
  }
}

const getName = (event) => { //hero name 입력
  event.preventDefault();
  const target = event.target;
  const name = target["hero-name"].value;
  game = new Game(name);
  game.changeScreen('game');
}
 
function init() {
  $setNameForm.addEventListener('submit', getName); //hero name 입력
}

init();
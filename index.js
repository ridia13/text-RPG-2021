"use strict";

const $hero = document.querySelector("#js-hero");

const getName = (event) => {//hero name 입력
  event.preventDefault();
  const target = event.target;
  const name = target["hero-name"].value;
}

function init(){
  $hero.addEventListener('submit', getName);//hero name 입력
  //주인공 생성
}

init();
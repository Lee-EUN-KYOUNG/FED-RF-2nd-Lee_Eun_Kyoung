// 옷소매 갤러리 PJ js - main.js

import mFn from "./my_function.js";

/***********************************************************
  
        1. 기능정의: 버튼 클릭시 갤러리박스를 잘라서 앞/뒤로 이동함
        1-1. 오른쪽버튼 클릭시 - 맨앞div 맨뒤로 이동
        -> 갤러리부모박스.appendChild(맨앞자식div)
        1-2. 왼쪽버튼 클릭시 - 맨뒤div 맨앞으로 이동
        -> 갤러리부모박스.insertBefore(맨뒤자식div,맨앞자식div)
        
 ***********************************************************/


// 1. 대상 선정
// 1-1. 이벤트 대상 : .abtn (이동 버튼들)
const abtn = mFn.qsa(".abtn");
// 1-2. 변경 대상 : .gbx (갤러리 부모 박스)
const gbx = mFn.qs(".gbx");

//console.log(abtn,gbx);

// 2. 이벤트 설정하기
abtn.forEach(ele=>{
    mFn.addEvt(ele, "click", changeSlide);

}); ///////////// forEach 함수 //////

// 3. 변수 설정하기
// 광클금지 (true는 금지, false는 허용)
let stopClick = false;
// 애니 시간 (잠금 시간)
const TIME_SLIDE = 400;

// 4. 함수 만들기
// 갤러리 이동하기 함수
function changeSlide(){

    // 1. 버튼 구분하기
    // classList.contains("클래스명"); -> 해당 클래스명이면 true 아니면 false
    let isR = this.classList.contains("rb");
    console.log("나",isR);
    
} /////////// changeSlide 함수 //////

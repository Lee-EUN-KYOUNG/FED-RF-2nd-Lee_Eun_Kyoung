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


    // 0. 광클 금지
    if(stopClick) return;
    stopClick = true;
    setTimeout(() => stopClick = false, TIME_SLIDE);

    // 1. 버튼 구분하기
    // classList.contains("클래스명"); -> 해당 클래스명이면 true 아니면 false
    let isR = this.classList.contains("rb");
    console.log("나",isR);

    // 2. 이동 대상 담기 (변수 할당)
    let eachOne = mFn.qsaEl(gbx,"div");

    // 3. 분기하기
    // 3-1. 오른쪽 버튼일 경우
    if(isR){
        // 오른쪽에서 이미지 박스가 들어오므로
        // 맨앞 div 맨뒤로 이동함!
        // appendChild(맨앞div)
        // 대상 : gbx
        gbx.appendChild(eachOne[0]);
    } /////// if

    // 3-2. 왼쪽 버튼일 경우
    else{
        // 왼쪽에서 이미지 박스가 들어오므로
        // 맨뒤 div 맨앞으로 이동함!
        // inserBefore(맨뒤div를 맨앞 div에다가)
        // 대상 : gbx
        // 맨뒤 div 순번은 [갯수-1]
        gbx.insertBefore(eachOne[eachOne.length-1],eachOne[0]);
    } /////// else




} /////////// changeSlide 함수 //////

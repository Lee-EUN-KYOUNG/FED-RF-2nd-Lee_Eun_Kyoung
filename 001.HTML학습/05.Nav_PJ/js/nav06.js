// 네비게이션 유형6 JS - nav06.js
// 가로네비 서브별 드롭다운 전체창

/************************************************** 모둘 불러오기 구역 **************************************************/

// 내 함수 불러오기
import mFn from "./my_function.js";

// GNB 생성 함수 파일 불러오기
import  makeMenu from "./gnb_menu.js";

// 드래그 슬라이드 기능 함수 불러오기
import setSlide from "./drag_slide.js";


/***************************************************** 기능 구현 파트 *****************************************************/

// 메뉴 구현 함수 호출하기
makeMenu(mFn.qs(".gnb"));


// 바로 실행 구역 함수 1 ///
(()=>{

  // 1. 배너 리스트 셋팅하기
  // (1) 대상 : .ban-slide
  const slideBox = mFn.qs('.ban-slide');
  
  // 슬라이드 코드 변수 
  let slideCode = '';
  
  // (2) 슬라이드 li 코드 만들기
  for(let i = 12; i<=24; i++){
    
    // 끝번호 둘 12, 13부터 시작하고 1부터 11까지 나열
    let temp = (i>13) ? (i-13) : i;
    
    // 세번째 슬라이드 (이미지 1번) 에만 클래스 on 넣기
    slideCode += `
    <li ${temp===1?'class="on"':''}>
    <img
    src = "./images/img_nav06/ban${temp}.png"
    alt="시코르배너" />
    </li>
    `;
    
  } //////////// for ////////////
  
  // (3) 리스트 코드 적용하기
  slideBox.innerHTML = slideCode;

})();

// 바로 실행 구역 함수 2 ///
(()=>{

  // 2. 서브 배너 리스트 셋팅하기
  // (1) 대상 : .sub-slide
  const slideBox = mFn.qs('.sub-slide');
  
  // 슬라이드 코드 변수 
  let slideCode = '';
  
  // (2) 슬라이드 li 코드 만들기
  for(let i = 4; i<=14; i++){
    
    // 끝번호 둘 12, 13부터 시작하고 1부터 11까지 나열
    let temp = (i>5) ? (i-6) : i;
    
    // 세번째 슬라이드 (이미지 1번) 에만 클래스 on 넣기
    slideCode += `
    <li ${temp===1?'class="on"':''}>
    <img
    src = "./images/img_nav06/sban${temp}.jpg"
    alt="시코르서브배너" />
    </li>
    `;
    
  } //////////// for ////////////
  
  // (3) 리스트 코드 적용하기
  slideBox.innerHTML = slideCode;

})();












// 2. 드래그 슬라이드 기능 함수 호출하기
setSlide("banbx");
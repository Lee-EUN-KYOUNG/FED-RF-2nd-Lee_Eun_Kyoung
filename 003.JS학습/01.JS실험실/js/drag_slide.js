// 드래그 기능 +  슬라이드 기능 합친 JS - drag_slide.js

// DOM 모듈함수
import mFn from "./my_function.js";

/// 배너 셋팅을 위한 함수 (노출용)
export default function setSlide(clsName) {
  // clsName 변수는 슬라이드 전체 박스 클래스명 "banbx"가 들어옴

  // [1] 슬라이드 셋팅하기 /////////////
  // 슬라이드 대상요소 : .banbx
  const banBox = mFn.qsa("." + clsName);
  // console.log('슬라이드 대상:',banBox);

  // 슬라이드 만큼 모두 호출하기!
  banBox.forEach((ele) => {
    // 슬라이드 함수 호출하기
    // 하위 슬라이드 선택요소(드래그 대상요소인 슬라이드)
    /* let subSlide= mFn.qsEl(ele,'.slide') */
    // -> slideFn 함수에서 하위 .slide를 수집하고 있으므로 따로 보낼 필요 없음

    slideFn(ele);
    // 실제 DOM요소를 보낸다!
  }); /////// forEach ///////////
} /////////////////////////////// setSlide 함수 ///////////////////////

/****************************************************** 
    함수명: slideFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
          + 드래그 이동 기능 (goDrag함수 합침)
 ******************************************************/

function slideFn(selEl) {
  // selEl 선택 슬라이드 부모 요소(banbx)

  // 0.슬라이드 공통변수 /////
  // 0-1. 광클금지상태변수 : 0-허용,1-불허용
  let clickSts = 0;
  // 0-2. 슬라이드 이동시간 : 상수로 설정
  const TIME_SLIDE = 400;
  // 0-3. 슬라이드 기준 위치값 :
  let originalValue = selEl.offsetWidth * -2.2;

  //가로 크기의 2.2배 음수값

  // 1. 대상선정
  // 1-1. 슬라이드 부모요소 : 전달된 선택요소 -> selEl
  const sldWrap = selEl; // DOM요소를 직접 받음!!!
  // 1-2.변경 대상: 선택요소 하위 .slide
  const slide = mFn.qsEl(sldWrap, ".slide");
  // 1-3.이벤트 대상: 선택요소 하위 .abtn
  const abtn = mFn.qsaEl(sldWrap, ".abtn");
  // 1-4.블릿박스 대상: 선택요소 하위 .indic li
  let indic = mFn.qsEl(sldWrap, ".indic");

  // 대상확인
  // console.log('대상',abtn,slide,indic);

  // 1.4. 슬라이드 개수와 동일한 블릿동적생성
  // 대상: .indic -> indic변수
  // 슬라이드개수
  let sldCnt = mFn.qsaEl(slide, "li").length;
  // for문으로 블릿li생성(0번만 클래스 on넣기)
  for (let i = 0; i < sldCnt; i++) {
    indic.innerHTML += `
            <li ${i == 0 ? 'class="on"' : ""}>
                <img src="images/dot1.png" alt="흰색">
                <img src="images/dot2.png" alt="회색">
            </li>
        `;
  } /////// for문 ////////////

  // 블릿li 재선택할당하기 /////
  indic = mFn.qsaEl(sldWrap, ".indic li");

  // 1.5. li리스트에 순번속성 만들어 넣기
  // 만드는이유: 블릿변경 등에 현재 슬라이드 순번 필요!
  // 사용자 정의 속성은 반드시 'data-'로시작해야함!(W3C규칙)
  // data-seq 로 순번 속성을 넣을 것임!
  slide
    .querySelectorAll("li")
    .forEach((ele, idx) => ele.setAttribute("data-seq", idx));
  // setAttribute(속성명,속성값) -> 속성셋팅 JS내장메서드

  // 2. 이벤트 설정하기 : 버튼요소들 -> forEach()
  abtn.forEach((ele) => mFn.addEvt(ele, "click", goSlide));
  
  // 3. 함수만들기
/**********************************************************
    함수명 : goSlide
    기능 : 이동 버튼 클릭시 이동 분기하기
 **********************************************************/

  function goSlide() {
    // a요소 기본이동 막기
    event.preventDefault();

    // 광클금지 //////////////
    if (clickSts) return; //나가!
    clickSts = 1; //잠금!
    setTimeout(() => (clickSts = 0), TIME_SLIDE); //해제!

    // 호출확인
    // console.log('나야나!',this,this.classList.contains('ab2'));

    // classList.contains(클래스명)
    // 선택요소에 해당클래스가 있으면 true

    // 1. 오른쪽 버튼 여부 알아내기
    let isRight = this.classList.contains("ab2");

    // 2. 버튼분기하기 '.ab2' 이면 오른쪽버튼
    if (isRight) {
      // 오른쪽버튼
      // 오른쪽에서 들어오는 슬라이드함수 호출!
      rightSlide();
    } ////// if //////////////
    else {
      // 왼쪽버튼
      leftSlide();
    } /////// else //////////////

    // 3. 블릿순번 변경 함수 호출
    chgIndic(isRight); // 방향값을 보냄!

    // 4. 자동넘김 멈춤함수 호출하기
    clearAuto();

    // 5. 중앙 li 클래스 on 넣기
    let slideSeq = isRight ? 3 : 2;
    // slideSeq값은 오른쪽 버튼 2, 왼쪽 버튼 3
    addOnSlide(slideSeq);
  } ////////// goSlide 함수 /////////

  /**********************************************************
    함수명 : addOnSlide
    기능 : 중앙슬라이드 클래스 on처리
 **********************************************************/

  // 중앙 슬라이드 클래스 on 처리 함수
  function addOnSlide(slideSeq) {
    mFn.qsaEl(slide, "li").forEach((ele, idx) => {
      if (idx === slideSeq) ele.classList.add("on");
      else ele.classList.remove("on");
    }); ///////// forEach /////////////
  } //////////// addOnSlide 함수 //////////

  /**********************************************************
    함수명 : chgIndic
    기능 : 블릿순번 변경
 **********************************************************/

  // 블릿순번 변경 함수 /////////////
  function chgIndic(isRight) {
    // isRight(0-왼쪽,1-오른쪽)
    // 1. 슬라이드 순번과 일치하는 블릿에 클래스 넣기
    // 대상: .indic li -> indic변수
    // 맨앞 슬라이드 li의 'data-seq' 값 읽어오기
    // isRight값이 true이면 오른쪽버튼이고 순번은 [1]
    // isRight값이 false이면 왼쪽버튼이고 순번은 [0]
    let nowSeq = slide
      .querySelectorAll("li")
      [isRight ? 1 : 0].getAttribute("data-seq");

    // console.log('현재슬라이드 순번:',nowSeq);

    // 2. 해당순번 블릿li에 클래스 on넣기
    // 블릿전체순회시 해당순번에 on넣고 나머지는 on빼기
    indic.forEach((ele, idx) => {
      if (idx == nowSeq) ele.classList.add("on");
      else ele.classList.remove("on");
    }); ///////// forEach ///////////
  } /////////// chgIndic함수 ////////////


  /**********************************************************
    함수명 : rightSlide
    기능 : 왼쪽 방향 이동 (오른쪽 버튼)
 **********************************************************/

  // 슬라이드 오른쪽 버튼 클릭시 왼쪽 방향 이동 함수 ////////////
  function rightSlide() {
    //1.대상이동하기 : -330%
    slide.style.left = "-330%";
    //2.트랜지션주기
    slide.style.transition = TIME_SLIDE + "ms ease-out";
    // 이동시간 후 맨앞li 잘라서 맨뒤로 이동하기
    // appendChild(요소)
    setTimeout(() => {
      // 3.맨앞li 맨뒤로 이동
      slide.appendChild(slide.querySelectorAll("li")[0]);
      // 4.slide left값 -220% -> 최종 left 값 px로
      slide.style.left = originalValue + "px";
      // 5.트랜지션 없애기
      slide.style.transition = "none";
    }, TIME_SLIDE);

    // 슬라이드 커버 만들기 함수 호출
    coverDrag();

  } //////////// rightSlide 함수 ////////////

  // 슬라이드 왼쪽 버튼 클릭시 오른쪽 방향 이동 함수 ////////////
  // 드래그 이동시엔 left값을 -330%가 아닌 드래그가 이동된 값을 적용한 left값으로 한다
  // 함수 전달 변수를 leftVal ="330%"로 기본 입력값 처리하면
  // 함수 호출시 전달값이 없는 경우엔 기본값으로 처리하고
  // 전달값이 있으면 그 전달될 값으로 처리한다! -> 함수 전달 변수 입력값 처리라고 함


  /**********************************************************
    함수명 : leftSlide
    기능 : 오른쪽 방향 이동 (왼쪽 버튼)
 **********************************************************/

  function leftSlide(leftVal = "-330%") {
    console.log("왼쪽버튼이동 left값:", leftVal);
    // leftVal - li 앞에 이동시 left값 설정변수
    // 0. 슬라이드 li 새로 읽기
    let eachOne = slide.querySelectorAll("li");
    // 1. 맨뒤li 맨앞으로 이동
    // 놈.놈.놈 -> insertBefore(넣을놈,넣을놈전놈)
    slide.insertBefore(eachOne[eachOne.length - 1], eachOne[0]);
    // 2. left값 -330% 만들기 : 들어올 준비 위치!
    slide.style.left = leftVal;
    // 3. 트랜지션 없애기
    slide.style.transition = "none";

    // 같은 left값을 동시에 변경하면 효과가 없음!
    // 비동기적으로 처리해야함!
    // -> setTimeout으로 싸주기!
    // 시간은 0이어도 비동기 처리므로 효과있음!

    setTimeout(() => {
      // 4. left값 -220%으로 들어오기 -> px 값으로 변환
      slide.style.left = originalValue + "px";

      // 5. 트랜지션주기
      slide.style.transition = TIME_SLIDE + "ms ease-out";
    }, 0);

    // 슬라이드 커버 만들기 함수 호출
    coverDrag();

  } //////////// leftSlide( 함수 ////////////


  /******************************************************* 
        자동넘기기 기능구현
        -> 일정시간간격으로 오른쪽버튼 클릭
        -> 사용JS내장함수 : setInterval()
        -> 버튼클릭 실행 메서드: click()
        대상: 오른쪽버튼 - .ab2 -> abtn[1]
    *******************************************************/

  // 인터발변수
  let autoI;
  // 인터발타이밍함수를 변수에 할당후
  // clearInterval(할당변수) 해야 멈출 수 있다!

  // 타임아웃변수
  let autoT;
  // 타임아웃함수도 마찬가지임!
  // clearTimeout(할당변수) 해야 실행 쓰나미를 막을 수 있다!

  /**********************************************************
    함수명 : slideAuto
    기능 : 인터발 호출
 **********************************************************/

  // 인터발호출 함수 //////////
  function slideAuto() {
    autoI = setInterval(() => {
      // 오른쪽이동 슬라이드 함수호출
      rightSlide();
      // 블릿변경함수호출(오른쪽은 1)
      chgIndic(1);

      // 중앙 슬라이드 클래스 on 넣기 함수 호출 -> 오른쪽 버튼(왼쪽) 이동이므로 3을 보낸다
      addOnSlide(3);

      // // console.log('실행!');
      // 오른쪽버튼 클릭이벤트 강제발생!
      // 선택요소.click()
      //  abtn[1].click();
    }, 3000);

  } ///////// slideAuto 함수 //////////////


  // 인터발함수 최초호출!
  slideAuto();


  /**********************************************************
    함수명 : clearAuto
    기능 : 자동 이동 멈추기 (인터발 삭제)
 **********************************************************/

  // 버튼을 클릭할 경우를 구분하여 자동넘김을 멈춰준다!
  function clearAuto() {
    // 자동넘김 지우기
    // clearInterval(인터발할당변수)
    // console.log('멈춤!!!');

    // 1. 인터발 지우기
    clearInterval(autoI);
    // 2. 타임아웃 지우기(재실행호출 쓰나미 방지)
    clearTimeout(autoT);
    // 3. 일정시간후 다시 인터발호출셋팅하기!!!
    autoT = setTimeout(slideAuto, 5000);
    // 결과적으로 5초후 인터발재실행은 하나만 남는다!
  } //////////// clearAuto 함수 ///////////


  /**********************************************************
    함수명 : coverDrag
    기능 : 슬라이드 이동시 드래그 막기
 **********************************************************/

  function coverDrag(){

    // selEl로 전달된 대상에 클래스 on 줘서 가상 요소 셋팅한 슬라이드 커버가 나오게 지정함
    selEl.classList.add("on");

    // 슬라이드 기본 이동 시간(TIME_SLIDE) 후 클래스 on 제거
    setTimeout(() => {
      selEl.classList.remove("on");
    }, TIME_SLIDE);


  } ///////////////// coverDrag 함수 ///////


  /*********************************** 드래그 기능 구현 **************************************************************/


  //////////////////// 드래그 적용 대상 및 이벤트 설정하기 /////////////////////////

  // 1. 대상 선정 :  보내준 대상 HTML 컬렉션
  /* const dtg = mFn.qs('.dtg2'); */

  const dtg = slide;
  // 슬라이드는 선택 박스 하위 슬라이드

  // 드래그 할 대상의 CSS 기본값을 셋팅한다
  // 필수 셋팅 요소는 position: relative / top:0 / left:0

  dtg.style.position = "relative";
  /* dtg.style.top = "0"; */

  // 배너가 기준 박스에서 left -220% 이동 되어 있음
  // -> .banbx의 width 값 곱하기 2.2
  // 기준 위치값 변수에 할당 먼저하기 -> originalValue 변수값 할당
  let leftVal = originalValue;

  /* 왼쪽으로 이동할 기준값(기준 위치값*1.1) */
  let valFirst = leftVal * 1.1;
  /* 오른쪽으로 이동할 기준값(기준 위치값*0.9) */
  let valSecond = leftVal * 0.9;

  console.log("기준값:", leftVal);
  console.log("기준값의 110%:", valFirst);
  console.log("기준값의 90%:", valSecond);

  // left 위치값 최초 셋업 - px 단위 꼭 쓸것
  dtg.style.left = leftVal + "px";

  // 2. 변수셋팅
  // (1) 드래그 상태 변수 만들기
  let dragSts = false;
  // false는 드래그 아님, true는 드래그 상태

  // (2) 첫번째 위치 포인트 : first x, first y
  let firstX;

  // (3) 마지막 위치 포인트 : last x, last y
  // 최초 위치 셋팅값으로 프리셋팅
  let lastX = leftVal;

  // (4) 움직일때 위치 포인트 : move x, move y
  let moveX;

  // (5) 위치 이동 차이 계산 결과 변수 : result x, result y
  let resultX;

  ////////////////////////////////////////////////////////
 ////////////// 3. 함수 만들기 ///////////////////////////////

  // 할당형 함수를 만들 경우 이벤트 설정보다 위에서 만들어준다

  // (1) 드래그 상태 true로 변경하는 함수
  const dTrue = () => (dragSts = true);

  // (2) 드래그 상태 false로 변경하는 함수
  const dFalse = () => (dragSts = false);

  // (3) 드래그일때 처리함수
  const dMove = (e) => {



    // e =   이벤트 객체 전달 변수
    // 드래그 상태는 dragSts값이 true인 경우에만 허용
    if (dragSts) {

        // 자동넘김 멈춤함수 호출하기
        /* clearAuto(); */

      /* // console.log('드래그중'); */

      // (1) 드래그 상태에서 움직일때 포인터 위치값
      // - 브라우저용 포인터 위치는 pageX, pageY 사용

      // 모바일용 터치 스크린 터치 위치는 touches[0].screenX / touches[0].screenY 사용
      // 두 가지 전부 사용하는 방법은? -> or문 할당법 쓴다
      // or문이란? 변수 = 할당문 1 || 할당문2
      // -> 두 할당문 중 값이 유효한(true) 값이 할당 됨
      // 모바일과 PC버전 코드를 동시에 셋팅 가능

      /*   moveX = e.pageX;
        moveY = e.pageY; */
      moveX = e.pageX || e.touches[0].screenX;

      /* // console.log(e.touches[0]); */

      // (2) 움직일 위치 결과값
      // 움직일때 위치 포인트 - 첫번째 위치 포인트
      // moveX - firstX
      // moveY- firstY
      resultX = moveX - firstX;

      // 순수하게 움직인 거리를 계산함
      //  움직인 위치 - 첫번째 위치 순으로 빼준 이유는?
      // => top, left 위치 이동 양수, 음수 차를 고려한 순서임

      // (3) 이동 차이를 구한 resultX, resultY값을 대상 위치값에 적용
      // 대상 : 드래그 요소 dtg
      dtg.style.left = resultX + lastX + "px";
      // 처음에 lastX, lastY 값이 0으로 들어오고
      // 두번째는 mouseup 이벤트 발생부터 저장된 최종 이동 위치값이 더해진다.

      // 값 확인
      // console.log(`moveX: ${moveX}`);
      // console.log(`resultX: ${resultX}`);
    } //////////// if ////////////

    // 드래그 중(dragSts===true)일때는 주먹손(grabbing),
    // 드래그 아닐때는(dragSts===fales) 편손 (grab)
    dtg.style.cursor = dragSts ? "grabbing" : "grab";
  }; ///////////// dMove 함수 ///////////////

  // (4) 첫번째 위치 포인트 셋팅함수 : firstX, firstY 값 셋팅
  const firstPoint = (e) => {
    /* firstX = e.pageX;
    firstY = e.pageY; */
    // PC 버전과 모바일 버전 값을 동시에 OR 문으로 할당함

    firstX = e.pageX || e.touches[0].screenX;

    // console.log('첫포인트:',firstX);
  }; ///// firstPoint 함수

  // (5) 마지막 위치 포인트 셋팅함수 : lastX, lastY 값 셋팅
  // 왜 필요하지? -> 이동 후 결과 위치를 저장하여 다음 드래그 이동할때 그 결과를 중첩하여 반영하기 위해서 필요함

  const lastPoint = () => {
    // 이동 결과 : 계산된 최종값을 기존 값에 더함(+=)
    lastX += resultX;
    // console.log('끝포인트:',lastX);
  };


  // (6) 슬라이드 드래그 이동 구현
  // -> mouseup/touchend 이벤트 발생시 아래 함수 호출
  const moveDragSlide = () => {
    // 중앙 li 순번 방향별 셋팅하기
    // -> 왼쪽 버튼(오른쪽이동) 기준
    let slideSeq = 2;

    // 오른쪽 버튼일 경우? 순번은 3이 된다 -> 업데이트는 오른쪽일 경우에만 해준다
    // 기타일 경우는 3번째 순번인 2를 유지

    // 대상의 left값  찍기 (px 단위를 parseInt()로 없애기)
    let currentLeft = parseInt(dtg.style.left);

    // 대상의 left 값 찍기
    console.log("슬라이드 left:", currentLeft, "x축 순수이동값:", resultX);

    // 대상의 슬라이드 이동 기준 분기하기
    if (currentLeft < valFirst) {
      console.log("왼쪽으로 이동");
      // 오른쪽 버튼 클릭시 왼쪽 이동과 동일!
      // on 넣을 li 순번 업데이트
      rightSlide();
      slideSeq = 3;
    } ////////// if /////////
    else if (currentLeft > valSecond) {
      console.log("오른쪽으로 이동");
      // 왼쪽 버튼 클릭시 오른쪽 이동과 동일

      // 슬라이드 이동함수 드래기스 이동된 값이 계산된 -330%값을 보내준다
      let resVal = selEl.offsetWidth * -3.3 + resultX;
      console.log('모바일',resultX);

      leftSlide(resVal + "px");

    } /////// else if ///////////
    else {
      // valFirst와 valSecond 사이 범위
      console.log("제자리!");
      slide.style.left = "-220%";
      slide.style.transition = ".3s ease-in-out";
    } ///////////// else //////

    // 드래그시 더해지는 마지막 위치값 lastX를 -220%의 left px값을 초기화해주기
    // -> 숫자만 넣어야함
    lastX = originalValue;

    // 중앙 li 클래스 on 넣기
    // slideSeq값은 오른쪽 버튼 2, 왼쪽 버튼 3
    addOnSlide(slideSeq);

    // 블릿변경 함수 호출 : 오른쪽이 3일때 true
    chgIndic(slideSeq === 3 ? true : false);
  }; //////////// moveDragSlide 함수 /////////////


  /////////////////////////////////////////// 4. 드래그 이벤트 설정하기//////////////////////////////////////////////////
  
  
  // (1) 마우스 다운 이벤트 함수 연결하기
  mFn.addEvt(dtg, "mousedown", (e) => {

    // 자동넘김 멈춤함수 호출하기

    /* clearAuto(); */
    // 자동호출을 지우기만해서 자동시작 안함
    clearInterval(autoI);
    clearTimeout(autoT);

    // 드래그 상태값 true로 변경
    dTrue();

    // 첫번째 위치 포인트 셋팅
    firstPoint(e);
    // 단독 할당 되지 않고 내부 함수 호출로 연결되어 있으므로 이벤트 전달을 토스해줘야 한다
    // => 전달 변수 e 지정

    // 마우스 다운시 주먹손
    dtg.style.cursor = "grabbing";

    // z-index 전역변수(zNum) 숫자를 1씩 높이기
    /* dtg.style.zIndex = ++zNum; */

    // console.log('마우스다운',dragSts);
  }); /////////// mousedown /////////////////////

  // (2)  마우스 업 이벤트 함수 연결하기
  mFn.addEvt(dtg, "mouseup", (e) => {

    // 자동넘김 멈춤함수 호출하기
    clearAuto();

    // 드래그 상태값 false로 변경
    dFalse();

    // 마지막 위치 포인트 셋팅
    lastPoint(e);

    // 마우스 없을시 편손
    dtg.style.cursor = "grab";

    //  드래그 슬라이드 이동 함수 호출
    moveDragSlide();

    // console.log('마우스업',lastX);

  }); /////////// mouseup /////////////////////

  // (3) 마우스 무브 이벤트 함수 연결하기

  mFn.addEvt(dtg, "mousemove", dMove);

  ////////////////////// mousemove  ///////////////////

  // (4) 마우스가 대상을 벗어나면 드래그 상태값 false 처리하기
  mFn.addEvt(dtg, "mouseleave", () => {
    // 드래그 상태값 flase로 변경
    dFalse();

    // 과도한 드래그로 갑자기 아웃되면 lastX, lastY 값이 셋팅되지 못한다
    // -> 기존 요소의 위치값으로 보정해야됨
    // 단 style 위치값 코드는 'px' 단위가 있으므로 parseInt 처리

    /* lastX = parseInt(dtg.style.left);
    lastY = parseInt(dtg.style.top); -> 드래그 배너에서는 불필요! (있으면 오히려 드래그 오작동남) */

    // console.log('마우스 나감',dragSts);
  }); /////////// mouseleave

  /////////////////// 모바일 이벤트 처리 구역 /////////////////////////////

  // (1) 터치 스타트 이벤트 함수 연결하기
  mFn.addEvt(dtg, "touchstart", (e) => {

    // 자동넘김 멈춤함수 호출하기

    /* clearAuto(); */
    // 자동호출을 지우기만해서 자동시작 안함
    clearInterval(autoI);
    clearTimeout(autoT);

    // 드래그 상태값 true로 변경
    dTrue();

    // 첫번째 위치 포인트 셋팅
    firstPoint(e);

    // z-index 전역변수(zNum) 숫자를 1씩 높이기
    /* dtg.style.zIndex = ++zNum; */

    // console.log('터치스타트',dragSts);
  }); /////////// touchstart /////////////////////

  // (2)  터치 엔드 이벤트 함수 연결하기
  mFn.addEvt(dtg, "touchend", () => {

    // 자동넘김 멈춤함수 호출하기
    clearAuto();

    // 드래그 상태값 false로 변경
    dFalse();

    // 마지막 위치 포인트 셋팅
    lastPoint();

    // console.log('터치엔드',dragSts);

    // 드래그슬라이드 이동함수 호출
    moveDragSlide();

  }); /////////// touchend /////////////////////

  // (3) 터치 무브 이벤트 함수 연결하기

  mFn.addEvt(dtg, "touchmove", dMove);
  ////////////////////// touchmove  ///////////////////

  //// 브라우저 크기 리사이즈시 동적 변경값 업데이트 함수
  mFn.addEvt(window, "resize", () => {
    // 기준 위치값 left 업데이트
    originalValue = selEl.offsetWidth * -2.2;

    // 기준 위치값으로 실제 슬라이드 CSS left값 변경하기
    slide.style.left = originalValue + "px";

    // 초기 left값 셋팅
    leftVal = originalValue;

    /* 왼쪽으로 이동할 기준값(기준 위치값*1.1) */
    valFirst = leftVal * 1.1;

    /* 오른쪽으로 이동할 기준값(기준 위치값*0.9) */
    valSecond = leftVal * 0.9;

    // 호출 작동 확인
    console.log("리사이즈작동", originalValue, leftVal, valFirst, valSecond);
  }); //////////////////// resize 함수 ///////////
} /////////////////////// SlideFn 함수 /////////////////////

// 배너 슬라이드 JS - slide.js //


// 모듈로 내보낼 때 하나만 내보내면 export default를 사용
// 맨 아래서 이름을 호출하여 사용하거나 함수 앞에 사용할 수도 있음

///// 슬라이드 전체 함수 ///////////////////////

export default function slideFn() {
  // DOM 선택함수
  const qs = (x) => document.querySelector(x);
  const qsa = (x) => document.querySelectorAll(x);

  // addEvent 함수
  // ele - 요소, evt - 이벤트, fn - 함수
  const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

  // HTML태그 로딩후 loadFn함수 호출! ///
  addEvt(window, "DOMContentLoaded", loadFn);

  /***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

  // 전역변수구역 //////////
  /* 
    (참고: JS에서 이름짓는 일반규칙)
    1. 변수/함수 : 캐믈케이스(첫단어소문자 뒷단어 대문자시작)
    2. 생성자함수/클래스 : 파스칼케이스(모든첫글자 대문자)
    3. 상수 : 모든글자 대문자(연결은 언더스코어-스네이크 케이스)
*/

  /****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
  function loadFn() {
    // console.log("로딩완료!");
    // 이동 버튼 대상 : .abtn
    const abtn = qsa(".abtn");
    // 변경 대상 : #slide
    const slide = qs(".slider");
    //console.log(abtn,slide);

    // 블릿버튼 : .indic
    let indic = document.querySelector(".indic");
    //// 초기 셋팅하기
    // 3개의 슬라이드와 블릿을 만들어주기
    for (let i = 0; i < 3; i++) {
      // 슬라이드 넣기
      slide.innerHTML += `
    <li data-seq="${i}" class="snum-0${i+1}"></li>
    `;

      // 블릿 넣기
      indic.innerHTML += `
    <li ${i === 0 ? 'class="on"' : ""}></li>
    `;
    } ////////// for문 ///////

    // li를 생성한 후 그 li 다시 수집한다!
    // 블릿의 li까지 수집! indic 변수
    indic = document.querySelectorAll(".indic li");

    // 2. 버튼을 모두 이벤트 설정하기
    for (let x of abtn) {
      x.onclick = goSlide;
    } //////////////// for문

    /*   // 2. 오른쪽 버튼 클릭시 기능 구현
    abtn[1].onclick = () => {
  
    };
  
    // 2. 왼쪽 버튼 클릭시 기능 구현
    abtn[0].onclick = () => {
  
    }; */

    // 광클 금지 변수
    let prot = false;
    /***************************************************************************************************************
          함수명 : goSlide
          기능 : 슬라이드 이동
       ***************************************************************************************************************/

    function goSlide(evt, sts = true) {
      // evt - 이벤트 객체 전달 : PointerEvent{}
      // sts - 버튼 클릭인지 자동 호출인지 구분하는 전달 변수
      // sts=true면 버튼 클릭, false면 자동 호출로 구분
      // -> 버튼 클릭시엔 아무것도 안 보내므로 기본값 true가 할당되어 적용됨
      // -> 만약 전달값이 없으면 기본값으로 셋탕함 (ES6문법에서 전달변수 초기값주기 새로 추가됨)

      // 함수를 호출시 아무값도 보내지 않으면
      // 함수의 전달 변수 하나를 쓸 경우나
      // 또는 여러 전달 변수 중에 첫번째 이벤트 객체가 전달된다
      // 그대신 변수를 하나 쓰면 그것이 이벤트 변수를 전달하는 역할을 함

      // console.log("전달변수:", evt, sts);

      // 만약 버튼 클릭일 경우 인터발 지우기 함수 호출
      if (sts) {
        clearAuto();
      } //////// if ///////////

      /////////// 광클 금지 설정하기 -> 무한 클릭 신호를 막아서 못들어오게 하고 일정시간 후 다시 열어준다
      if (prot) return; // 돌아가! (함수나감)
      prot = true; // 잠금 (뒤의 호출이 모두 막힘)
      setTimeout(() => {
        prot = false; // 0.6초후 해제!
      }, 600);
      /////////////////////////////////////////////

      // 두번째 버튼인 .ab2인가?
      let isRbtn = sts ? this.classList.contains("ab2") : true;
      // stst 값이 true가 맞으면 버튼을 클릭한 것이므로 this 키워드에 의한 클래스 .ab2 존재여부를 물어본다
      // false가 맞으면 무조건 true 값을 할당해라 ->  오른쪽 클릭한 방향으로 가야되기 때문

      // [classList 객체의 contains() 메서드]
      // -> 해당 요소의 특정 클래스인지 여부를 리턴함
      // 해당 클래스가 있으면 true, 없으면 false

      // 함수 호출 확인
      // console.log("나 슬라이드", this, isRbtn);
      //this는 호출한 버튼 자신

      ///// 2. 버튼별 분기하기 (나누기)
      // 오른쪽 버튼일 경우 //
      if (isRbtn) {
        // (1) 먼저 왼쪽으로 이동하기
        slide.style.left = "-100%";
        slide.style.transition = ".6s ease-in-out";

        // (2) 이동하는 시간 0.6초간 기다림
        setTimeout(() => {
          // 맨앞 li 맨뒤로 이동
          slide.appendChild(slide.querySelectorAll("li")[0]);
          // 슬라이드 left 값이 -100%이므로 left값을 0으로 변경
          slide.style.left = "0";
          // left 트랜지션 없애기
          slide.style.transition = "none";
        }, 600);

        // 맨 앞 li 맨뒤로 이동하기
        // appendchild(요소)
        // -> 원래 뒤에 요소 추가 기능임
        // -> 기존 있는 요소를 선택시 맨뒤로 이동함
        // 맨앞요소를 선택하여 맨뒤로 보냄
      } // if문 ///

      /// 왼쪽 버튼일 경우
      else {
        // 하위 li 수집하기
        let list = slide.querySelectorAll("li");

        // (1) 맨뒤 li 맨앞으로 이동하기
        // 놈놈놈 시리즈!!
        // insertBefore(넣을놈,넣을놈전놈)
        // insertBeofre(맨뒤li,맨앞li)
        slide.insertBefore(list[list.length - 1], list[0]);

        // (2) left 값을 -100%로 변경하여 맨뒤 li가 맨앞으로 온것을 숨긴다
        // 왼쪽에서 슬라이드 들어올 준비!!
        slide.style.left = "-100%";
        // 트랜지션이 한번 버튼 클릭후 생기므로
        slide.style.transition = "none";

        // 같은 left 값을 변경하기 때문에 코드처리 구역을 분리하여준다
        // 이때 사용되는 메서드는 setTimeout()
        // 시간차는? -> 0을 줘도 코드 분리하여 처리하므로 동시처리가 아니고 비동기처리하기때문에 코드가 잘 작동함
        setTimeout(() => {
          /// (3) left 값을 0으로 트랜지션하여 들어옴
          slide.style.left = "0";
          slide.style.transition = ".6s ease-in-out";
        }, 0);
      } ////// else문

      // 3. 블릿을 위해 읽어올 슬라이드 순번 구하기
      // 현재 순번은 몇번째 슬라이드의 data-seq 속성값이다!
      // 오른쪽 버튼은 이동후 잘라내므로 두번째 순번 [1]
      // 왼쪽 버튼은 먼저 앞에 붙이고 이동하므로 첫번째 순번[0]
      let seq = slide
        .querySelectorAll("li")
        [isRbtn ? 1 : 0].getAttribute("data-seq");
      /* console.log('블릿이 읽어올 슬라이드 순번:',seq,
    '/데이터형:',typeof seq); */
      // string : 문자형, number : 숫자형

      // 4. 블릿 변경하기
      // 모든 클래스 on 지우기 + 현재 순번 클래스 넣기
      indic.forEach((ele, idx) => {
        // ele - 각각의 li , idx - 각각의 순번
        if (idx == seq) {
          // 현재 순번 on 넣기, == 비교해야 결과가 나옴! data-seq 속성은 문자형 숫자이므로!
          // ==은 형까지 비교하기때문에 안 나옴
          ele.classList.add("on");
        } /// if ////
        else {
          // 나머지는 on 빼기
          ele.classList.remove("on");
        } //// else ////
      }); /// forEach ///
    } /////////////////// goSlide 함수

    //////////////// 인터발용 변수 (지울목적)
    let autoI;
    // 타임아웃용 변수 (지울 목적)
    let autoT;
    // 자동넘김 호출함수 최초 호출하기
    autoSlide();

    //////////////// 자동 넘김 호출 함수 /////////////////////////////////
    function autoSlide() {
      // setInterval(함수,시간) - 일정 시간 간격으로 함수를 호출
      // clearInterval(인터발변수) - 변수에 담긴 인터발을 지움(멈춰!)
      autoI = setInterval(() => {
        /* abtn[1].onclick(); */
        // 값을 2개 보내야함
        // -> 첫번째 전달값은 이벤트 객체가 들어가는 변수이므로 false값을 쓰고
        // 두번째 전달값은 자동 호출임을 알리는 호출이므로 false값을 전달한다
        goSlide(false, false);
      }, 3000);
    } ///////// autoSlide 함수

    //////////// 인터발 지우기 함수 /////////////////
    function clearAuto() {
      // 지우기 확인
      console.log("인터발 지워");
      // 1. 인터발 지우기
      clearInterval(autoI);
      // 2. 타임아웃 지우기 : 실행 쓰나미 방지!!
      clearTimeout(autoT);
      // 3. 5초 후 아무작동도 안하면 다시 인터발 호출하기
      autoT = setTimeout(() => {
        autoSlide();
      }, 5000);
    } ///////// clearAuto함수 ///////////

    // 이동 버튼 이벤트 설정하기
    // 이벤트 대상 : 이동 버튼 영역 - .evt-cover aside

    // 변경 대상 : 버튼 - .abtn -> abtn 이미 할당 됨
    const evtCover = qsa('.evt-cover aside');
    evtCover.forEach((ele,idx) => {
      // console.log(ele);
      // 이벤트 셋팅하기1 : mouseover (버튼 보이기)
      ele.onmouseover = () => {
        abtn[idx].style.display = 'block';
      }; ///// 마우스 오버


      // 이벤트 셋팅하기2 : mouseout (버튼 숨기기)
      ele.onmouseout = () => {
        abtn[idx].style.display = 'none';
      }; //// 마우스 아웃

      // 이벤트 셋팅하기3 : mousemove (버튼 따라오기)
      ele.onmousemove = (e) => {
        abtn[idx].style.top = e.pageY + 'px'; 
        abtn[idx].style.left = e.pageX + 'px'; 
      }; ////////////// 마우스무브 ///////////
      
    }); ////////////////////// forEach







  } //////////////// loadFn 함수 ///////////////
} /////////////////////////// SlideFn 함수 /////////////////////////////////////////////////////////

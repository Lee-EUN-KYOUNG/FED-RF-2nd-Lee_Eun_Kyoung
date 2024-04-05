// Racing PJ 메인 JS - main.js


// DOM 메서드 모듈
import myFn from './dom.js';

// 메시지 제이슨 파일 불러오기
// -> 어서써 타입 제이슨
// 내가 지은 변수명으로 import 후 맨끝에 assert {type:'json'}; 씀
// import msgTxt from './data_racing.json' assert {type:'json'};
// 'assert' is deprecated in import statements and support will be removed in V8 v12.6 and Chrome 126; use 'with' instead
// assert 키워드 지원 중단됨 (사용은 가능) 대신 with 키워드 권장
// 브라우저 지원 버전이 너무 최신일경우 with 대신 assert를 사용해야될 수 있음

import msgTxt from './data_racing.json' assert {type:'json'};

/// 불러온 것 확인
// console.log(myFn,msgTxt);



/********************************************** 
            [ 게임 기능정의 ]
    _________________________________

    1. 게임룰: 거북버튼 클릭하여 거북을
        왼쪽에서 오른쪽으로 이동함
        이때 토끼는 자동으로 이동하여
        결승선에 먼저 도달하는 레이서가 승리함
    2. 토끼의 이동속도는 레벨로 설정함
    3. 결승선 도착은 둘 중 하나가 먼저
        도착할 경우 판별함수에서 결과를
        화면에 출력한다.
    4. 포커스가 버튼에 갈 경우 마우스가
        아닌 키보드 버튼으로 조작할 수 없게함
        (마우스만 사용하도록 함!)
    5. 기본적으로 거북이동버튼 클릭시
        토끼는 자동으롤 작동됨!
    6. 토끼이동버튼은 토끼만 미리 작동가능
    7. 처음으로 버튼은 전체를 리셋함
    
**********************************************/

// 1. 대상선정 ///////////////////
// (1) 거북 : #t1
const t1 = myFn.qs('#t1');

// (2) 토끼 : #r1
const r1 = myFn.qs('#r1');

// (3) 버튼 : #btns a
const btns = myFn.qsa('#btns a');

// (4) 레벨 : #level
const level = myFn.qs('#level');

// (5) 메시지박스 : #msg
const msg = myFn.qs('#msg');

// (6) 토끼, 거북 위치값 변수
// 토끼위치 : r1pos / 거북위치 : t1pos
let r1pos = 0, t1pos = 0;

// (7) 거북 이동값 상수
const T1_NUM = 16;

// (8) 결승선 위치 상수
const FINAL_NUM = 650;

// (9) 거북 작동 멈춤 상태 변수
let t1Stop = false;




// console.log('대상:',t1,r1,btns,level,msg);



// 2. 이벤트 설정하기 ////////////
btns.forEach(ele=>{

    myFn.addEvt(ele,'click',goGame);
    

}); /////////////// forEach ///////////////


/*********************************** 
    함수명: goGame
    기능: 버튼별 기능분기
***********************************/

function goGame(){

    // 1. 버튼 글자 읽기
    let btxt = this.innerText;
    //console.log('고고',btxt);
    // 2. 버튼별 기능 분기 하기
    if(btxt === '토끼출발'){
        goR1();

    } //////// if ////////////////

    else if(btxt === '거북출발'){

      // 거북 멈춤 상태값이 true이면 함수 나가! (return)
      if(t1Stop) return;

      // 거북의 설정된 값만큼 이동하기
      t1pos += T1_NUM;
      t1.style.left = t1pos + 'px';
      
      // 거북 버튼 클릭후 포커스로 인해 엔터 버튼을 사용할 수 있으므로 이를 막기 위해 포커스 해제
      // 즉 blur() 메서드로 처리함
      // 초점이 들어가게 하는 매서드는 focus()
      // 초점이 빠지게 하는 매서드는 blur()
      this.blur();


      // 토끼 자동호출
      goR1();

    } ///////////// else if

    else if(btxt === '처음으로'){
        // 페이지 리로드하기
        location.reload();

    } ///////////// else if

} /////////// goGame 함수 ////////////


 

/*********************************** 
 함수명: goR1
 기능: 토끼자동이동(인터발함수)
 ***********************************/
// 인터발지우기용 변수
let autoI;


function goR1(){

    // 호출이 한번만 되도록 autoI가 할당전엔 undefined이므로 if문에서 false처리됨
    if(!autoI){
        console.log('토끼인터발',level.value);
        autoI = setInterval(() => {
        // 토끼 위치 이동 (1px씩)    
        r1.style.left = ++r1pos + 'px';

        // 승자 판별 함수 호출 (인터발 내 계속 호출)
        whoWinner();

    }, level.value);

    ///// level.value는 선택박스의 선택된 값이다
    // 원래 option 요소의 value 값은 문자형이므로 숫자여도 숫자형으로 형변환해야하지만
    // 요즘 브라우저는 자동형 변환해준다

    

    } ///////////////////////// if 
  

} ///////// goR1함수 //////////////////



/***************************************** 
    함수명: whoWinner
    기능: 기준값 보다 레이서위치값이 큰경우
        승자를 판별하여 메시지를 보여준다!
*****************************************/


function whoWinner(){

  /*   console.log('토끼위치:',r1pos,
    '\n거북위치:',t1pos); */

    // 토끼 / 거북 위치 값이 기준값 이상일때 토끼 인터발 함수 멈추기 + 거북 클릭 작동 막기
    if(r1pos >= FINAL_NUM || t1pos >= FINAL_NUM){

        // (1) 토끼 멈춰
        clearInterval(autoI);
        // (2) 거북 멈춰
        t1Stop = true;

        // 승자 변수 (메시지 때문에 씀 : 토끼/거북/무승부)
        let winner;
        // (3) 승자 판별하기
        if(r1pos > t1pos) winner = '토끼';
        else if(r1pos < t1pos) winner = '거북';
        else winner = '비김';

        // (4) 랜덤수 만들기

        // (5) 메시지 넣기

        // 메시지 할당하기
        msg.innerText = msgTxt[winner][0];

        // 메시지 박스 보이기
        msg.style.display = 'block';
        msg.style.zIndex = '100';

        // (6) 전체 반투명 커버 암전주기
        myFn.qs('.cover').style.cssText = `
            position:fixed;
            top:0;
            left:0;
            width:100vw;
            height:100vh;
            background-color:#000;
            opacity:0.5;
            z-index:99;
        `; 

        // (7) 버튼 박스 위로 올리기
        myFn.qs('#btns').style.zIndex = 200;

    }  /////////////// if 

    

} ///////// whoWinner 함수 ////////////////
 

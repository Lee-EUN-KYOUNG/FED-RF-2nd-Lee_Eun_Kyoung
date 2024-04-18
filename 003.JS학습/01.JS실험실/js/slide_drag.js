// 슬라이드 드래 모듈 JS -  slide_drag.js

// 나의 함수 불러오기
import mFn from "./my_function.js";

/*************************************** 
    [ 드래그 기능 구현을 위한 이벤트 ]
    1. 딸 -> 마우스 포인터 누름 -> mousedown

    2. 각 -> 마우스 포인터 올라옴 -> mouseup

    3. 질질 -> 마우스 움직일때 -> mousemove
    -> 드래그 상태는 "딸"상태에서 "질질"하는것!
    
    mousedown 할때 드래그 상태변수값을 true로 변경
    mouseup 할때 드래그 상태변수값을 false으로 변경
    _______________________________________

    [ 드래그 기능구현 원리 ]

    1. 마우스 포인터 위치에 따른 변화 수치를
    계산하여 요소의 top,left 위치값으로 반영한다!

    2. 프로세스
    (1) mousedown 이벤트에서는 시작위치값 저장
    -> 모바일 이벤트 : touchstart
    (2) mousemove 이벤트에서는 움직인위치와 시작위치 차이저장
    -> 모바일 이벤트 : touchmove
    (3) mousemove에서 차이값을 타겟요소의 left,top값에 반영
    (4) mouseup 이벤트에서는 다음 이동을 위한 마지막위치 저장
    -> 모바일 이벤트 : touchend
    (5) mousemove 이벤트에서 마지막위치로 부터의 이동을 계산함


***************************************/

/*********************************************************************************************************************************** 
                                                    [드래그 다중 적용 호출 함수 만들기]
                                                    함수명 : setDrag
                                                    기능 : 드래그 적용 요소 함수 호출하기
***********************************************************************************************************************************/

function setDrag(clsName){

    // ele -  드래그 대상 요소 클래스 이름 받는 변수
    // -> 하나씩 전달된 드래그 대상 요소임
    console.log(clsName);

    // 1. 받은 클래스 이름으로 요소 수집
    let ele = mFn.qsa("."+clsName);
        
    // 2. 드래그 함수 호출
    // HTML 컬렉션이므로 forEach 메서드로 호출

    //forEahc((요소,순번,전체)=>{})
    // z는 전체 요소 집합 컬렉션임 ( z-idex 초기화로 필요함)

    ele.forEach((x)=>goDrag(x));
    

} ////////////////// setDrag 함수 ///////////////////



// z-idex 공통관리 변수 (전역 변수 - goDrag 함수 바깥에 있으므로)
/* let zNum = 0; */


/*********************************************************************************************************************************** 
                                        [드래그 다중 적용 함수 만들기]
                 함수명 : goDrag
                 기능 : 다중 드래그 기능 적용
                 * 수정 필요 사항 체크!
                 1) 드래그 시 위치 이동 안 되는 버그
                 -> 원인 : top, left값 셋팅 잘 안 될 경우 에러 발생
                 2) z-index 초기화로 인한 순서 변경이 어색함 
***********************************************************************************************************************************/



function goDrag(ele){

    // ele -  호출시 보내준 대상을 받는 변수
    // 대상 : HTML 컬렉션으로 보낸 대상만 받게 함

    console.log(ele);


///////////////// 드래그 적용 대상 및 이벤트 설정하기 //////////////////////

// 1. 대상 선정 :  보내준 대상 HTML 컬렉션
/* const dtg = mFn.qs('.dtg2'); */
const dtg = ele;

// 드래그 할 대상의 CSS 기본값을 셋팅한다
// 필수 셋팅 요소는 position: relative / top:0 / left:0

dtg.style.position = "relative";
/* dtg.style.top = "0"; */

// 배너가 기준 박스에서 left -220% 이동 되어 있음
// -> .banbx의 width 값 곱하기 2.2
// 기준 위치값 변수에 할당 먼저하기
let leftVal = mFn.qs('.banbx').offsetWidth*-2.2;
console.log('left 셋팅값:',leftVal);
// left 위치값 최초 셋업 - px 단위 꼭 쓸것
dtg.style.left = leftVal + 'px';




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
// 3. 함수 만들기

// 할당형 함수를 만들 경우 이벤트 설정보다 위에서 만들어준다

// (1) 드래그 상태 true로 변경하는 함수
const dTrue = () => dragSts = true;

// (2) 드래그 상태 false로 변경하는 함수
const dFalse = () => dragSts = false;

// (3) 드래그일때 처리함수
const dMove = (e) => {

    // e =   이벤트 객체 전달 변수
    // 드래그 상태는 dragSts값이 true인 경우에만 허용
    if(dragSts){

        /* console.log('드래그중'); */

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

        /* console.log(e.touches[0]); */
        
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
        dtg.style.left = resultX + lastX + 'px';
        // 처음에 lastX, lastY 값이 0으로 들어오고
        // 두번째는 mouseup 이벤트 발생부터 저장된 최종 이동 위치값이 더해진다.

        // 값 확인
        console.log(`moveX: ${moveX}`);
        console.log(`resultX: ${resultX}`);


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

    console.log('첫포인트:',firstX);

}; ///// firstPoint 함수


// (5) 마지막 위치 포인트 셋팅함수 : lastX, lastY 값 셋팅
// 왜 필요하지? -> 이동 후 결과 위치를 저장하여 다음 드래그 이동할때 그 결과를 중첩하여 반영하기 위해서 필요함


const lastPoint = () => {

    // 이동 결과 : 계산된 최종값을 기존 값에 더함(+=)
    lastX += resultX;
    console.log('끝포인트:',lastX);

}; ///// lastPoint 함수



// 4. 드래그 이벤트 설정하기
// (1) 마우스 다운 이벤트 함수 연결하기
mFn.addEvt(dtg,'mousedown',(e) => {

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

console.log('마우스다운',dragSts);


}); /////////// mousedown /////////////////////




// (2)  마우스 업 이벤트 함수 연결하기
mFn.addEvt(dtg,'mouseup',(e) => {

// 드래그 상태값 false로 변경
dFalse();

// 마지막 위치 포인트 셋팅
lastPoint(e);

// 마우스 없을시 편손
dtg.style.cursor = "grab";

console.log('마우스업',dragSts);
    

}); /////////// mouseup /////////////////////


// (3) 마우스 무브 이벤트 함수 연결하기

mFn.addEvt(dtg,'mousemove', dMove);  ////////////////////// mousemove  ///////////////////


// (4) 마우스가 대상을 벗어나면 드래그 상태값 false 처리하기
mFn.addEvt(dtg,'mouseleave',()=>{

    // 드래그 상태값 flase로 변경
    dFalse();

    // 과도한 드래그로 갑자기 아웃되면 lastX, lastY 값이 셋팅되지 못한다
    // -> 기존 요소의 위치값으로 보정해야됨
    // 단 style 위치값 코드는 'px' 단위가 있으므로 parseInt 처리
    
    /* lastX = parseInt(dtg.style.left);
    lastY = parseInt(dtg.style.top); */

    console.log('마우스 나감',dragSts);


});  /////////// mouseleave

/////////////////// 모바일 이벤트 처리 구역 /////////////////////////////


// (1) 터치 스타트 이벤트 함수 연결하기
mFn.addEvt(dtg,'touchstart',(e) => {

    // 드래그 상태값 true로 변경
    dTrue();
    
    // 첫번째 위치 포인트 셋팅
    firstPoint(e);

    // z-index 전역변수(zNum) 숫자를 1씩 높이기
    /* dtg.style.zIndex = ++zNum; */
    
    console.log('터치스타트',dragSts);
    
    }); /////////// touchstart /////////////////////
    
    
    // (2)  터치 엔드 이벤트 함수 연결하기
    mFn.addEvt(dtg,'touchend',() => {
    
    // 드래그 상태값 false로 변경
    dFalse();
    
    // 마지막 위치 포인트 셋팅
    lastPoint();
    
    
    console.log('터치엔드',dragSts);
        
    }); /////////// touchend /////////////////////
    

    // (3) 터치 무브 이벤트 함수 연결하기
    
    mFn.addEvt(dtg,'touchmove', dMove);
    ////////////////////// touchmove  ///////////////////
    
} /////////////////////// goDrag 함수 /////////////////////


// 내보내기
export default setDrag;
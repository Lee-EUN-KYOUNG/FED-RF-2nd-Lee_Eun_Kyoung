// 05. 드래그 기본 JS -  drag.js

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
            [함수의 추상화 순서]
            1. 기존 하나만 구현한 저 수준의 함수를 하나의 함수로 감싸서 호출시 실행하도록 만든다.
            2. 적용 대상을 추상화 함수에 보내서 처리한다.
                                                    
***********************************************************************************************************************************/




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

    ele.forEach((x,y,z)=>goDrag(x,z));
    

} ////////////////// setDrag 함수 ///////////////////




/*********************************************************************************************************************************** 
                                                    [드래그 다중 적용 함수 만들기]
                                                    함수명 : goDrag
                                                    기능 : 다중 드래그 기능 적용
***********************************************************************************************************************************/



function goDrag(ele, coll){

    // ele -  호출시 보내준 대상을 받는 변수
    // 대상 : HTML 컬렉션으로 보낸 대상만 받게 함
    // coll - 드래그 요소 전체 컬렉션을 받는 변수
    // -> 마우스 다운시 z-index 대상 1로 만들때 다른 요소는 0 변경시 사용함

    console.log(ele,coll);


///////////////// 드래그 적용 대상 및 이벤트 설정하기 //////////////////////

// 1. 대상 선정 :  보내준 대상 HTML 컬렉션
/* const dtg = mFn.qs('.dtg2'); */
const dtg = ele;




// 2. 변수셋팅
// (1) 드래그 상태 변수 만들기
let dragSts = false;
// false는 드래그 아님, true는 드래그 상태

// (2) 첫번째 위치 포인트 : first x, first y
let firstX, firstY;

// (3) 마지막 위치 포인트 : last x, last y
// 마지막 위치로부터 처음 계산이 이루어지므로 초기값 0 필요
let lastX = 0, lastY = 0;

// 중첩된 최종 위치가 처음에는 계산되지 않았으므로 출발 위치인 0값으로 초기값을 넣어준다
// 초기값을 안 넣으면 최초 값을 더할 때 에러가 발생함


// (4) 움직일때 위치 포인트 : move x, move y
let moveX, moveY;

// (5) 위치 이동 차이 계산 결과 변수 : result x, result y
let resultX, resultY;


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
        moveX = e.pageX;
        moveY = e.pageY;
        
        
        // (2) 움직일 위치 결과값
        // 움직일때 위치 포인트 - 첫번째 위치 포인트
        // moveX - firstX
        // moveY- firstY
        resultX = moveX - firstX;
        resultY = moveY - firstY;
        // 순수하게 움직인 거리를 계산함
        //  움직인 위치 - 첫번째 위치 순으로 빼준 이유는?
        // => top, left 위치 이동 양수, 음수 차를 고려한 순서임


        // (3) 이동 차이를 구한 resultX, resultY값을 대상 위치값에 적용
        // 대상 : 드래그 요소 dtg
        dtg.style.left = resultX + lastX + 'px';
        dtg.style.top = resultY + lastY + 'px';

        // 처음에 lastX, lastY 값이 0으로 들어오고
        // 두번째는 mouseup 이벤트 발생부터 저장된 최종 이동 위치값이 더해진다.

        // 값 확인
        console.log(`moveX: ${moveX}, moveY: ${moveY}`);
        console.log(`resultX: ${resultX}, resultY: ${resultY}`);


    } //////////// if ////////////


    // 드래그 중(dragSts===true)일때는 주먹손(grabbing), 
    // 드래그 아닐때는(dragSts===fales) 편손 (grab)
    dtg.style.cursor = dragSts ? "grabbing" : "grab";


}; ///////////// dMove 함수 ///////////////




// (4) 첫번째 위치 포인트 셋팅함수 : firstX, firstY 값 셋팅
const firstPoint = e => {

    firstX = e.pageX;
    firstY = e.pageY;
    console.log('첫포인트:',firstX,'|',firstY);

}; ///// firstPoint 함수


// (5) 마지막 위치 포인트 셋팅함수 : lastX, lastY 값 셋팅
// 왜 필요하지? -> 이동 후 결과 위치를 저장하여 다음 드래그 이동할때 그 결과를 중첩하여 반영하기 위해서 필요함


const lastPoint = () => {

    // 이동 결과 : 계산된 최종값을 기존 값에 더함(+=)
    lastX += resultX;
    lastY += resultY;
    console.log('끝포인트:',lastX,'|',lastY);

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

// z-index 0 초기화 (전체 컬렉션 전달 변수 coll 사용)
coll.forEach(x=>x.style.zIndex =0);

// z-index 1로 높이기
dtg.style.zIndex =1;

console.log('마우스다운',dragSts);


}); /////////// mousedown /////////////////////




// (2)  마우스 업 이벤트 함수 연결하기
mFn.addEvt(dtg,'mouseup',(e) => {

// 드래그 상태값 false로 변경
dFalse();

// 마지막 위치 포인트 셋팅
lastPoint(e);

// 마우스 업시 편손
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
    
    lastX = parseInt(dtg.style.left);
    lastY = parseInt(dtg.style.top);

    console.log('마우스 나감',dragSts);


});  /////////// mouseleave


} /////////////////////// goDrag 함수 /////////////////////


// 내보내기
export default setDrag;
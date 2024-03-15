/* 큐브 애니메이션 JS - cube.js */

/* 
    [요구사항 분석]
    1. 버튼을 클릭하여 멈춰있던 큐브의 애니메이션 설정 상태를 업데이트하여 작동시킨다
    2. 이때 버튼은 "돌아!" -> "멈춰!" 로 변경시킨다
    3. 다시 멈춰 버튼을 버튼클릭시 돌고있던 큐브의 애니메이션 설정 상태를 변경하여 멈추게 한다.
    -> 버튼은 다시 "돌아!" 로 변경
*/

// 1. 대상 선정
// 1-1. 이벤트 대상 : .btngo
const btngo = document.querySelector('.btngo');
// 1-2. 변경 대상 : .cube
const cube = document.querySelector('.cube');

// console.log('대상:',btngo,cube);

// 2. 이벤트 속성 셋팅하기
// 대상 버튼 : .btngo -> btngo 변수
// 이벤트 속성에 익명 함수를 할당하면 이벤트 발생시 익명하수 내부의 코드가 실행됨

btngo.onclick = function(){
    // 1. 함수 호출 확인 (this는 버튼 자신)
    // console.log('나야나',this);

    // 2. 변경 대상 : .cube -> cube 변수
    // 3. 변경 내용 : 큐브에 클래스 on 을 없으면 넣고 있으면 제거한다
    // -> 미리 셋팅된 애니 작동/멈춤 됨

    cube.classList.toggle('on');
    // classList는 요소의 클래스만 전문적으로 다뤄주는 JS 내장 객체
    // 매서드로 add() 넣기, remove() 지우기, toggle() 넣기/지우기

    // 4. 버튼 글자 변경하기
    // -> 읽어온 버튼 글자가 "돌아!" 면 "멈춰!"
    // -> "돌아!"가 아니면 "돌아!"를 텍스트로 넣는다
    // 조건 연산자 또는 삼항 연산자 사용
    // -> 비?집:놀이동산
    this.innerText = this.innerText=='돌아!'?'멈춰!':'돌아!';

    // if문으로 설정하기
    /* if(this.innerText == '돌아') {this.innerText = '멈춰!';}
    else {this.innerText = '돌아!';} */

    // 큐브 거리 변경 변수 셋팅은 html 요소에 클래스 on을 넣기/빼기하면 적용된다!

    document.querySelector('html').classList.toggle("on");

}; //// click 이벤트 함수 ////
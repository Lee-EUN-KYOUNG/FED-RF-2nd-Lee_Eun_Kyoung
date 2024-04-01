// CGV PJ 인트로 페이지 JS - intro.js

// 요구 사항 : 비디오 플레이가 끝나면 쳇페이지인
// main.html로 자동 이동하기

// 대상 : #myvid
const myvid = document.querySelector('#myvid');

// 이벤트 :  timeuotate -> 동영상 재생중 발생 이벤트
myvid.addEventListener('timeupdate',() => {
    
    // 1. 동영상 멈춤 여부 알아내기 : 비디오 요소.paused
    // => 멈춤 상태면 true, 아니면 false
    let isStop = myvid.paused;

    // 호출 확인
    console.log('재생중!',isStop);

    // 2. 멈춤 상태 (true) 면 페이지 이동
    // -> JS에서 페이지 이동은 location.hredf="이동할 주소or페이지"

    if(isStop){
        location.href = 'main.html';
    } ////// if

}); /////////////////////// timeuotate 이벤트 함수 //////////////////////////
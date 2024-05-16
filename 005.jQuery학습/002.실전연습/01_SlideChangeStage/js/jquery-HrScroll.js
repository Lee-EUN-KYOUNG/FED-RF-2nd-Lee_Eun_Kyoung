// 가로 방향 스크롤 구현 JS

// 1. 대상 요소 : html, body
const scTarget = $("html, body");


// 2. 스크롤 이벤트 설정 및 기능 구현하기
// 제이쿼리에서 전체 스크롤/휠 이벤트 작성시 대상은 항상 html, body로 두개 모두 잡아준다
// 참고로 document나 window는 사용 안됨
// 참고사항 : 휠 이벤트는 모바일과 무관하다 -> 모바일 터치 가로 스크롤은 그냥 가로 스크롤바만 살려주면 자연스럽게 됨

// 스크롤 위치값 변수
let scPos = 0;

// 페이지갯수
let pgCnt = $(".page").length;

// 윈도우 가로크기
let winW, maxLimit;

const chgLimit = () =>{
    
    winW = $(window).width();

    // 최대 한계값
    maxLimit = (winW*pgCnt) - winW;

    console.log(
        "window크기:", winW,
        "/페이지수:",pgCnt,
        "/최대한계값:",maxLimit);
}

// 최초 한계값 계산함수 호출
chgLimit();

// 윈도우 사이즈 변경시 한계값 업데이트
$(window).resize(chgLimit);
// resize() 메서드 : 리사이즈 이벤트 함수




// 이벤트 매서드 : on(이벤트명,함수)

// 스크롤 이동을 위한 제이쿼리 속성
// scrollTop : 세로 스크롤바 위치
// scrollLeft : 가로 스크롤바 위치
scTarget.on("wheel", (e)=>{
    
    // 휠 방향 알아내기 (전체 이벤트 객체로부터 얻어옴)
    let delta = event.wheelDelta;
    

    if(delta<0) scPos += 200;
    else scPos -= 200;

    // 한계값 체크
    // (1) 최소한계
    if(scPos<0) scPos = 0;
    // (2) 최대한계 : 전체 이동 박스 크기 - 화면 가로크기
    if(scPos>=maxLimit) scPos = maxLimit;

    console.log("휠",scPos,delta);

    // scTarget.animate({CSS설정},시간,이징,함수)
    
    // stop() 메서드 : 큐에 쌓인 애니메이션을 지운다
    // 중간에 쌓인 애니를 지우고 최종 애니만 실행한다
    
    scTarget.stop().animate({scrollLeft: scPos+"px"},2000,"easeOutQuart");
    
    // 이징(가속도) 참고 사이트 : https://easings.net/ko

}); /////////////// wheel 이벤트 구역
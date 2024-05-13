// 메인 페이지에서 서브 컨테늧 띄우는 구현 코드
export default function showSubBox(){

//console.log("서브박스다");

// 1. 서브 컨텐츠 보이기 기능 구현
// (1-1) 대상 선정
// 이벤트 대상 : .preview-box li (미리보기), .live-box li (현장 포토)
const subViewBox = 
    $(".preview-box li, .live-box li");

// (1-2) 변경 대상 : .sub-cont
const subContBox =  $(".sub-cont");

console.log(subViewBox);

// 2. 이벤트 설정 및 함수구현하기 ////
subViewBox.click(function(){
    console.log("나",this);
});

} ///////////////// showSubBox 함수 ///////////////////
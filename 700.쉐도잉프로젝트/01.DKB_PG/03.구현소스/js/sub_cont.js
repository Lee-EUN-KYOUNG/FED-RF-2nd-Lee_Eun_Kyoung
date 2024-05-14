// 메인 페이지에서 서브 컨테늧 띄우는 구현 코드

// 데이터 셋팅 불러오기
import * as dkbData from "../data/dkb_data.js";


export default function showSubBox(){

//console.log("서브박스다");

// 1. 서브 컨텐츠 보이기 기능 구현
// (1-1) 대상 선정
// 이벤트 대상 : 
// .preview-box li (미리보기), .live-box li (현장 포토), 
// .poster-box li (대표 포스터), .clip-box li (최신 동영상)


const subViewBox = 
    $(`
    .preview-box li,
    .live-box li, 
    .poster-box li,
    .clip-box li
    `);

// (1-2) 변경 대상 : .sub-cont
const subContBox =  $(".sub-cont");

// console.log(subViewBox);

// 2. 이벤트 설정 및 함수구현하기 ////
subViewBox.click(function(){

    // parent() 바로 위 상위 요소로 이동
    // 두번 위로 이동해서 li 위 ul 위의 div
    // 그 div 박스의 클래스가 preview-box인가? -> is(클래스명) 메서드로 알아보기
    let confPrt = $(this).parent().parent().is(".preview-box")

    // JS 문법에서는 아래와 같음
    // this.parentElement.parentElement.classList.contains(클래스명)

    console.log("나",this,confPrt);

    if(confPrt){

        // 키 속성값 읽어오기
        // attr(속성명) -> 속성값 읽어오기 메서드
        // attr(속석명,속성값) -> 속성값 넣기 메서드

        let idx = $(this).attr("data-idx");

        //console.log("idx:",idx,dkbData.previewData);

        // 배열 순회 메서드 비교 (forEach vs find)
        // forEach는 모두 순회한다
        // find() 메서드는 조건에 맞을 때 return true 하면 해당 배열값이 변수에 할당된다
        // 만약 일치하는 데이터가 없으면 undefined 됨

        //dkbData.previewData.forEach(v=>{
        let selData = dkbData.previewData.find(v=>{

            if(v.idx == idx){
                console.log("오:",v);
                return true;
            }
            console.log("돌아");
        }); //////////////// find

            console.log("검색결과:",selData);

        // 서브 박스에 내용 넣기
        // 제이 쿼리는 innerHTML 할당대신 html() 메서드를 사용함

        subContBox.html(`
        <button class="cbtn">×</button>
        <div class="sub-inbox inbox">
          <h1>${selData.title}</h1>
          <div class="sub-item">${selData.story}</div>
        </div>
        `).show();
        // show(); 는 display 보여주는 메서드
        // hide(); 는 display 숨기는 메서드
        // toggle(); 는 display 토글하는 메서드

        // 닫기 버튼 이벤트 설정
        $(".cbtn").click(()=>subContBox.hide());

    } ////////////////////////if


});

} ///////////////// showSubBox 함수 ///////////////////
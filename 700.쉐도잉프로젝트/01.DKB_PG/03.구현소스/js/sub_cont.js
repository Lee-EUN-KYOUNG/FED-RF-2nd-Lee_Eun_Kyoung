// 메인 페이지에서 서브 컨테늧 띄우는 구현 코드

// 데이터 셋팅 불러오기
import * as dkbData from "../data/dkb_data.js";
//console.log(dkbData);

export default function showSubBox() {
  //console.log("서브박스다");

  // 1. 서브 컨텐츠 보이기 기능 구현
  // (1-1) 대상 선정
  // 이벤트 대상 :
  // .preview-box li (미리보기), .live-box li (현장 포토),
  // .poster-box li (대표 포스터), .clip-box li (최신 동영상)

  const subViewBox = $(`
    .preview-box li,
    .live-box li, 
    .poster-box li,
    .clip-box li
    `);

  // (1-2) 변경 대상 : .sub-cont
  const subContBox = $(".sub-cont");

  // 전체 휠 이벤트 막기 때문에 서브 컨텐츠 박스도 휠이 되지 않는다
  // 따라서 휠 이벤트 버블링 막기 해야한다 -> stopPropagation();
  subContBox.on("wheel",e=>e.stopPropagation());

  // console.log(subViewBox);

  // 2. 이벤트 설정 및 함수구현하기 ////
  subViewBox.click(function () {
    // parent() 바로 위 상위 요소로 이동
    // 두번 위로 이동해서 li 위 ul 위의 div
    // 그 div 박스의 클래스가 preview-box인가? -> is(클래스명) 메서드로 알아보기
    //let confPrt = $(this).parent().parent().is(".preview-box");

    // [데이터명]
    // 사용하고자하는 데이터 이름을 ul 태그의 data-db 속성에 담아놓고 이것을 읽어온다
    //  $(this).parent()는 li 바로 위의 부모인 ul이다
    // attr('data-db') 속성값 읽어오기
    let db = $(this).parent().attr('data-db');


    // JS 문법에서는 아래와 같음
    // this.parentElement.parentElement.classList.contains(클래스명)

    console.log("나", this, db, dkbData[db]);

    //if (confPrt) {
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
      // dkbData[db] - 해당 데이터 매칭하기  
      let selData = dkbData[db].find((v) => {
        if (v.idx == idx) {
          console.log("오:", v);
          return true;
        }
        console.log("돌아");
      }); //////////////// find

      console.log("검색결과:", selData);


      /// 이미지의 갯수를 반영한 배열을 읨의로 만들고 필요한 경우 이 배열로 map()을 돌려서 코드를 생성한다
      // 우선 빈 배열을 만든다
      let iarr = [];
      // 현장 포토일 때 사용
      if(db=="liveData"){
        for(let i = 0; i<selData.imgName[1];i++)
        iarr[i] = "";
        console.log("이미지 배열을 위한 배열:",iarr);
      }


      // 서브 박스에 내용 넣기
      // 제이 쿼리는 innerHTML 할당대신 html() 메서드를 사용함

      subContBox
      .html(

        //미리 보기 출력
        db=="previewData"?
        `
      <button class="cbtn">×</button>
      <div class="sub-inbox inbox">
        <h1>${selData.title}</h1>
        <div class="sub-item scbar">${selData.story}</div>
      </div>
      `:
      // 현장포토 출력
      db=="liveData"?
      `
      <button class="cbtn">×</button>
      <div class="sub-inbox inbox">
      <h1>현장 포토 : ${selData.title}</h1>
      <div class="sub-item scbar">
      ${iarr.map((v,i)=>`
        <img src="./images/live_photo/${selData.imgName[0]}/${i+1}.jpg" alt="${selData.title}"/>
      `).join('')}
      </div>
      `:
      // 대표포스터 출력
      db=="posterData"?
      `
      <button class="cbtn">×</button>
      <div class="sub-inbox inbox">
      <h1>대표 포스터 : ${selData.title}</h1>
      <div class="sub-item scbar">
        <img src="./images/poster_img/${selData.imgName}_big.jpg" alt="${selData.title}"/>
      </div>
      `:
     // 클립 영상 출력
     db=="clipData"?
     `
     <button class="cbtn">×</button>
     <div class="sub-inbox inbox">
     <h1>클립 영상 : ${selData.title}</h1>
     <div class="sub-item scbar">
       <iframe src="https://www.youtube.com/embed/${selData.mvid}?autoplay=1"></iframe>
       <h2>${selData.subtit}</h2>
     </div>
     `:
      `
      <button class="cbtn">×</button>
        <div class="sub-inbox inbox">
        <h1>DB 정보 확인 필요</h1>
        </div>
      `
      )
      .show();
      // show(); 는 display 보여주는 메서드
      // hide(); 는 display 숨기는 메서드
      // toggle(); 는 display 토글하는 메서드

      // 닫기 버튼 이벤트 설정 : 숨기기, 내용 지우기
      $(".cbtn").click(() => {subContBox.hide().html('');});
    //} ////////////////////////if
  });


} ///////////////// showSubBox 함수 ///////////////////

// 06.Event : 리액트 이벤트

// 나의 함수 불러오기
import mFn from "./my_function.js";

/************************************************************* 
    [ 리액트 이벤트 ]
    1. 일반 HTML DOM 이벤트와 마찬가지로 사용자이벤트 사용가능함
    2. 이벤트 종류: click, change, mouseover 등 일반이벤트
    3. 이벤트 표기법: 캐믈케이스 - 첫글자소문자 단어마다 대문자
    예) onclick -> onClick
    4. 이벤트 핸들러 : 중괄호 안에 작성(중괄호는 JSX표현식영역)
    예) onclick="getIt()" => onClick={getIt}
*************************************************************/

///////////////// 전체 이벤트 적용할 컴포넌트 구성하기 ////////////////////
function EventShow() {

  // 컴포넌트 리턴 코드 위에서 이벤트 처리를 위한 함수 만들어서 사용할 수있다
  // 지역 함수로 사용

// 오버시 이벤트 한번만 실행되게 상태 변수 만들기
let onceSts = false;

  // 1. 컴포넌트 내부 함수

 // (1) 소원이 무엇이냐 물어보는 함수
    const showAladin = () => {
        if(onceSts) return;
        
        // 한번만 실행
        onceSts = true; 
        /* console.log('알라딘이 누구야?'); */

        // HTML 출력 대상 : #ala
        let alaBox = mFn.qs("#ala");
        // 알라딘 이미지 출력
        ReactDOM.render(<img src="./images/ala4.jpg" alt="알라딘"/>,alaBox);
     
        // 말풍선 박스에 글자 넣기
        let titBox = mFn.qs(".tit");
        titBox.innerText = "소원이 무엇이냐?";
        // 말풍선 박스이 인라인 css 코드 넣기
        titBox.style.cssText = `
        width: 50%;
        padding: 50px 0;
        margin: 0 auto;
        border: 2px solid lime;
        opacity: 0;
        `;
        // 0.5초후에 CSS 변경으로 타이틀 등장하기
        let tg = titBox.style;
        setTimeout(() => {
          tg.transition = "2s ease-in-out 1s";
          tg.opacity = 1;
          tg.borderRadius = "50%";
          tg.translate = "0 -200px";
          tg.fontSize = "40px";
          tg.color = "white";
          tg.backgroundColor = "rgba(0,0,0,.5)";
        }, 500);

        // 램프가져오기 버튼 3초후 보이기
        setTimeout(() => {
            mFn.qsa("button")[0].style.display = "inline-block";
        }, 3000);


    }; ///////////// showAladin 함수 //////

// (2) 램프 가져오기 함수
const getLamp = () => {

    console.log ("램프 가져와");
    // 1. 램프 선택하기 : .lamp
    let lampBox = mFn.qs(".lamp");
    // 램프 이미지 출력
    ReactDOM.render(<img src="./images/lamp.png" alt="램프" />,lampBox);


}; ///////// getLamp 함수 ////////////


  // 2. 리턴 코드 만들기
  return (
    <React.Fragment>
      <div id="tbox" style={{ textAlign: "center" }}>
        {/* 스타일 인라인 적용시 바깥 중괄호는 표현식, 
                내부 중괄호는 객체 형식의 스타일 설정 */}
        <img
        src="./images/genie.jpg" alt="지니"
        /* 마우스 오버시 showAladin 함수 호출 */
        onMouseOver={showAladin}
        />
        {/* 램프가 들어갈 요소 */}
        <div className="lamp"></div>
        {/* 버튼들 */}
        <button onClick={getLamp}>램프 가져오기</button>
        <button>소원빌기~ 페라리 주세요</button>

        {/* 소원이 무엇이냐 말풍선 박스 */}
        <div className="tit"></div>
      </div>
    </React.Fragment>
  ); ////////////
} ///////////////////// EventShow 컴포넌트 //////////////

/// 화면 출력하기
ReactDOM.render(<EventShow />, mFn.qs("#root"));

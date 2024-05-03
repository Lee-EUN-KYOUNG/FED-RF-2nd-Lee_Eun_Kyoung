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
    5. 리액트의 속성 형태로 등록하는 이벤트는 HTML 요소의 등록된
       이벤트 속성과 다르게 JS 이벤트 리스너를 통한 이벤트 객체의
       등록되므로 HTML 태그상 이벤트 등록 속성이 보이지 않는다

    [컴포넌트 호출시 중요한 특징]
    - 설정된 전달 변수와 셋팅 속성은 전달된 속성값만 셋팅된다
      보내주지 않은 속성은 스킵(skip)된다는 말
       
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
    if (onceSts) return;

    // 한번만 실행
    onceSts = true;
    /* console.log('알라딘이 누구야?'); */

    // HTML 출력 대상 : #ala
    let alaBox = mFn.qs("#ala");
    // 알라딘 이미지 출력
    ReactDOM.render(<MakeImg isrc="./images/ala4.jpg" ialt="알라딘" />, alaBox);

    // 컴포넌트 호출 시 전달 변수를 셋팅하여 보내야하는데 만약 전달 변수 이름이 되었거나 누락하면
    // 컴포넌트에서 에러표시 없이 해당 항목을 제외함->표시 자체를 하지 않는 특징이 있음
    // 해당 알라딘 이미지 불러오기에 icss가 있으나 안 보내주니 에러 표시 되지 않는다

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
    console.log("램프 가져와");
    // 1. 램프 선택하기 : .lamp
    let lampBox = mFn.qs(".lamp");

    // 램프 이미지 CSS 객체 셋팅
    let lampCSS = {
      position: "absolute",
      top: "0",
      right: "0",
      width: "200px",
      borderRadius: "50%",
      zIndex: "99999",
      transition: "2s, right 1s 2s",
    };

    // 램프 이미지 출력
    ReactDOM.render(
      <MakeImg
        isrc={
          "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3168457870/B.png"
        }
        ialt={"알라딘램프"}
        icss={lampCSS}
      />,
      lampBox
    );
    // 3. 0.5초후 램프 중앙 이동하기
    setTimeout(() => {
      let lampImg = mFn.qsEl(lampBox, "img").style;

      // 수직방향 이동
      lampImg.top = "310px";
      // 수평 방향 중앙 계산
      lampImg.right = "calc(50% - 100px)";
      // 회전 하기
      lampImg.rotate = "720deg";
    }, 500);

    // 소원 빌기 버튼 3초후 보이기
    setTimeout(() => {
      mFn.qsa("button")[1].style.display = "inline-block";
    }, 3000);
  }; ///////// getLamp 함수 ////////////

  // (3) 페라리 가져오기 함수
  const getFerrari = () => {
    console.log("페라리 줄께~!");
    // 페라리 이미지 넣기
    // 대상 : #ferrari
    ReactDOM.render(
      <MakeImg
        isrc="./images/ferrari.png"
        ialt="페라리레드"
        itit="클릭하면 시운전해요"
        idName="fcar"
        // 함수에 값을 보낼 때는 익명 함수로 처리
        clickFn={() => moveCar("#fcar")}
      />,
      mFn.qs("#ferrari")
    );
  }; //////////////// getFerrari 함수 /////////////////

  // 2. 리턴 코드 만들기
  return (
    <React.Fragment>
      <div id="tbox" style={{ textAlign: "center" }}>
        {/* 스타일 인라인 적용시 바깥 중괄호는 표현식, 
                내부 중괄호는 객체 형식의 스타일 설정 */}
        <MakeImg
          isrc="./images/genie.jpg"
          ialt="지니"
          /* 마우스 오버시 showAladin 함수 호출 */
          overFn={showAladin}
        />
        {/* 램프가 들어갈 요소 */}
        <div className="lamp"></div>
        {/* 버튼들 */}
        <button onClick={getLamp}>램프 가져오기</button> <br />
        <button onClick={getFerrari}>소원빌기~ 페라리 주세요</button>
        {/* 소원이 무엇이냐 말풍선 박스 */}
        <div className="tit"></div>
      </div>
    </React.Fragment>
  ); ////////////
} ///////////////////// EventShow 컴포넌트 //////////////

/*************************************************************************************************** 
                            [이미지 생성 컴포넌트] : MakeImg
***************************************************************************************************/
function MakeImg({ isrc, ialt, icss, overFn, itit, idName, clickFn }) {
  // 리턴 코드
  return (
    <img
      src={isrc}
      alt={ialt}
      style={icss}
      onMouseOver={overFn}
      title={itit}
      id={idName}
      onClick={clickFn}
    />
    // 리턴 코드 바로 뒤에 JSX 태그를 바로 이어쓰거나 소괄호 시작부분을 같은 라인에 써야 에러나지 않음
  );
} ///////////////////// MakeImg 컴포넌트

/// 화면 출력하기
ReactDOM.render(<EventShow />, mFn.qs("#root"));

// 일반 함수로 페라리 움직이기 구현
function moveCar(eleName) {
  // eleName - 요소명
  console.log("페라리 움직여", eleName);

  // 1. 대상 요소 셋팅하기
  const tg = mFn.qs(eleName).style;
  console.log(tg);

  // 2. 번갈아서 왔다갔다 움직이기
  tg.translate = tg.translate == "150%" ? "0" : "150%";

  tg.scale = tg.scale = "2" ? "1" : "2";

  tg.transition = "2s ease-in-out";
} /////////////// moveCar 함수 //////////
